import {action, observable} from "mobx";
import HttpStatusCode from "../../common/constants/HttpErrorCode";
import {toastUtil} from "../../common/utils/ToastUtil";
import {configService} from "./ConfigService";
import $ from "jquery"

class ConfigStore {
    @observable public isLoading: boolean = false;
    @observable public isLoadingButton: boolean = false;
    @observable public searchName: string = '';
    @observable public cateId: number = 0;
    @observable public page: number = 0;
    @observable public state: string = "";
    @observable public totalPages: number = 0;
    @observable public listCate: any[] = [];
    @observable public dataRequest: any = {
        id: 0,
        name: "",
        imageUrl: "",
        description: "",
        state: ""
    };

    @action async clearForm() {
        this.dataRequest = {
            id: 0,
            name: "",
            imageUrl: "",
            description: "",
            state: ""
        }
    }

    @action async getConfig() {
        const result = await configService.getConfig();
        if (result.status === HttpStatusCode.OK) {
            this.listCate = result.body.data;
            this.totalPages = result.body.metadata.totalPages;
        } else {
            toastUtil.error(result.body.message);
        }
    }


    @action async configDetail(configKey: string) {
        const result = await configService.configDetail(configKey);
        if (result.status === HttpStatusCode.OK) {
            this.dataRequest = result.body;
        } else {
            toastUtil.error(result.body.message);
        }
    }

    async addConfig(){
        let { name, imageUrl, description, state} = this.dataRequest;

        if(!name) {
            toastUtil.warning('Vui lòng nhập Name');
            return false;
        }
        if(!imageUrl) {
            toastUtil.warning('Vui lòng chọn AvatarUrl');
            return false;
        }
        if(!description) {
            toastUtil.warning('Vui lòng nhập Description');
            return false;
        }
        if(!state) {
            toastUtil.warning('Vui lòng chọn State');
            return false;
        }

        const result = await configService.addConfig(this.dataRequest);

        if(result.status === HttpStatusCode.OK){
            await this.getConfig();
            $('#close_add_cate').trigger("click")
            toastUtil.success('Add category success')
        }else {
            toastUtil.error(result.body.message);
        }
    }



}

export const configStore = new ConfigStore();
