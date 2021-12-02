import {observable} from "mobx";
import {configService} from "./ConfigService";
import {toastUtil} from "../../common/utils/ToastUtil";
import $ from "jquery"

class ConfigStore{
    @observable isLoading: boolean = false;
    @observable page: number = 0;
    @observable configKey: any = '';
    @observable totalPages: number = 0;
    @observable listConfig: any[] = [];
    @observable key: any = '';
    @observable dataInfo: any = {
        key: "",
        type: "",
    };
    @observable dataRequest: any = {
        id: 0,
        key: "",
        value: [],
        type: "",
    };

    async getConfig(){
        try {
            this.isLoading = true;
            const result = await configService.getConfig()
            this.isLoading = false;
            if(result.status === 200){
                this.listConfig = result.body.data;
                this.totalPages = result.body.metadata.totalPages
            }
        }catch (e){
            console.log(e)
            return true
        }
    }

    async configDetail(key: any){
        const result = await configService.configDetail(key)
        if(result.status === 200){
            result.body.value = result.body.value.split(', ')
            this.dataInfo = result.body;
        }
    }

    async addConfig(){
        let {key, value, type} = this.dataRequest;

        if(!key){
            toastUtil.warning("Vuil lòng nhập key")
            return false;
        }
        if(!type){
            toastUtil.warning("Vuil lòng chọn type")
            return false;
        }

        if(!value){
            toastUtil.warning("Vuil lòng chọn value")
            return false;
        }

        let data = {
            key: key,
            value: value.join(', '),
            type: type
        }
        const result = await configService.addConfig(data);

        if(result.status === 200){
            await this.getConfig()
            toastUtil.success("Add config success");
            $('#close_add').trigger('click')
        }

    }

    async editConfig(){
        let {key, value, type} = this.dataInfo;

        if(!key){
            toastUtil.warning("Vuil lòng nhập key")
            return false;
        }
        if(!type){
            toastUtil.warning("Vuil lòng chọn type")
            return false;
        }

        if(!value){
            toastUtil.warning("Vuil lòng chọn value")
            return false;
        }

        let data = {
            key: key,
            value: value.join(', '),
            type: type
        }
        const result = await configService.editConfig(data);

        if(result.status === 200){
            await this.getConfig()
            toastUtil.success("Edit config success");
            $('#close_edit').trigger('click')
        }

    }

    async deleteConfig(){
        const result = await configService.deleteConfig(this.key);
        if(result.status == 200){
            toastUtil.success("Delete config success")
            $('#close_delete').trigger('click')
            this.listConfig.map((item, i) => {
                if(this.key == item.key){
                    this.listConfig.splice(i, 1)
                }
            })
        }
    }
}

export const configStore = new ConfigStore()