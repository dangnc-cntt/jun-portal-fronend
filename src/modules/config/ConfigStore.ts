import {observable} from "mobx";
import {configService} from "./ConfigService";

class ConfigStore{
    @observable isLoading: boolean = false;
    @observable page: number = 0;
    @observable configKey: any = '';
    @observable totalPages: number = 0;
    @observable listConfig: any[] = [];
    @observable configInfo: any;

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
        const result = await configService.deleteConfig(key)
        if(result.status === 200){
            this.configInfo = result.body;
        }
    }
}

export const configStore = new ConfigStore()