# build environment
FROM node:12.10.0-alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json /app/package.json
RUN npm install --quiet
RUN npm config set unsafe-perm true
COPY . /app
RUN npm run build

# production environment
FROM nginx:1.16.0-alpine
WORKDIR /
COPY --from=build /app/build /usr/share/nginx/html
#COPY build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
COPY docker-entrypoint.sh generate_config_js.sh /
COPY robots /robots
RUN chmod +x docker-entrypoint.sh generate_config_js.sh

EXPOSE 9005

ENTRYPOINT ["/docker-entrypoint.sh"]
