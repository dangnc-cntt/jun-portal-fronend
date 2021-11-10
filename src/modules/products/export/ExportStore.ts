import {observable} from "mobx";
import {exportService} from "./ExportService";

class ExportStore{
    @observable isLoading: boolean = false;
    @observable page: number = 0;
    @observable exportDetail: any;
    @observable listExport: any[] = [];
    @observable totalPages: number = 0;
    @observable requestData: any = {

    }

    async getExport(){
        this.isLoading = true;
        const result = await exportService.getExport()
        this.isLoading = false;
        console.log('vào')
        if(result.status === 200){
            this.listExport = result.body.data;
            this.totalPages = result.body.metadata.totalPages;
        }
    }

    async detailExport(id: any){
        this.isLoading = true;
        const result = await exportService.detailExport(id)
        this.isLoading = false;
        if(result.status === 200){
            this.exportDetail = result.body;
        }
    }

    async addExport(){
        let data = {

        }
        this.isLoading = true;
        const result = await exportService.addExport(data)
        this.isLoading = false;
        if(result.status === 200){

        }
    }




}

export const exportStore = new ExportStore();
