import {observable} from "mobx";
import {receiptService} from "./ReceiptService";

class ReceiptStore {
    @observable isLoading: boolean = false;
    @observable page: number = 0;
    @observable receiptDetail: any;
    @observable listReceipt: any[] = [];
    @observable totalPages: number = 0;
    @observable dataRequest: any = {

    }

    async getReceipt(){
        this.isLoading = true;
        const result = await receiptService.getReceipt()
        this.isLoading = false;
        if(result.status === 200){
            this.listReceipt = result.body.data;
            this.totalPages = result.body.metadata.totalPages;
        }
    }


    async detailReceipt(id: any){
        this.isLoading = true;
        const result = await receiptService.detailReceipt(id)
        this.isLoading = false;
        if(result.status === 200){
            this.receiptDetail = result.body;
        }
    }

    async addReceipt(){
        let data = {

        }
        this.isLoading = true;
        const result = await receiptService.addReceipt(data)
        this.isLoading = false;
        if(result.status === 200){

        }
    }
}

export const receiptStore = new ReceiptStore();
