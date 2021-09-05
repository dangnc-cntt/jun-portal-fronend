#!/usr/bin/env groovy

node {
    properties([disableConcurrentBuilds()])

    try {

        def remote = [:]
        remote.name = 'wi-lv-payment-2'
        remote.host = '45.118.145.200'
        remote.user = 'ipredict'
        remote.allowAnyHosts = true

        project = "mtg-portal-frontend"
        dockerRepo = "dockerhub.infra.wiinvent.tv"
        imagePrefix = "mtg"
        dockerFile = "Dockerfile"
        imageName = "${dockerRepo}/${imagePrefix}/${project}"
        buildNumber = "${env.BUILD_NUMBER}"
        IMAGE_BUILD = "${imageName}:${env.BRANCH_NAME}-build-${buildNumber}"
        k8sCluster = "local"
        k8sNameSpace = "mtg-mm-prod"
        k8sEnv = "production"
        dockerComposeDevFile = "dev-docker-compose.yml"
        dockerComposeProdFile = "prod-docker-compose.yml"

        stage('checkout code') {
            checkout scm
            sh "git checkout ${env.BRANCH_NAME} && git reset --hard origin/${env.BRANCH_NAME}"
        }

        stage('build') {
            sh """
                egrep -q '^FROM .* AS builder\$' ${dockerFile} \
                && docker build -t ${imageName}-stage-builder --target builder -f ${dockerFile} .
                docker build -t ${imageName}:${env.BRANCH_NAME} -f ${dockerFile} .
            """
        }
        stage('push') {
            sh """
                docker push ${imageName}:${env.BRANCH_NAME}
                docker tag ${imageName}:${env.BRANCH_NAME} ${imageName}:${env.BRANCH_NAME}-build-${buildNumber}
                docker push ${imageName}:${env.BRANCH_NAME}-build-${buildNumber}
            """
        }
        switch (env.BRANCH_NAME) {
            case 'develop':
                remote.name = 'wiivent-mongodb-dev-01'
                remote.host = '10.130.97.31'
                remote.user = 'ipredict'
                stage('trigger deploy dev') {
                    sh """
                        rsync -aurv ${dockerComposeDevFile} ${remote.host}::ipredict-apps/${project}/
                        export IMAGE_BUILD=${imageName}:${env.BRANCH_NAME}-build-${buildNumber}
                        ssh -o StrictHostKeyChecking=no ${remote.user}@${remote.host} 'export IMAGE_BUILD=${imageName}:${env.BRANCH_NAME}-build-${buildNumber} && cd /ipredict/${project}/ && docker-compose -f ${dockerComposeDevFile} down && docker-compose -f ${dockerComposeDevFile} up -d'
                    """
                }
                break
            case 'master':
                stage('deploy-prod') {
                    sh """
                    ## Deploy cluster LongVan
                    /usr/local/k8s/bin/k8sctl --cluster-name=${k8sCluster} --namespace=${k8sNameSpace} --environment=${k8sEnv} --service-name=${project} --image-name=${IMAGE_BUILD}
                  """
                }
                break

        }

    } catch (e) {
        currentBuild.result = "FAILED"
        throw e
    }
}
