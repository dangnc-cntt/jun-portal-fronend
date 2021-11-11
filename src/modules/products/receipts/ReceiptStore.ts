import {observable} from "mobx";
import {receiptService} from "./ReceiptService";
import {toastUtil} from "../../../common/utils/ToastUtil";

class ReceiptStore {
    @observable isLoading: boolean = false;
    @observable page: number = 0;
    @observable idProduct: number = 0;
    @observable receiptDetail: any;
    @observable listReceipt: any[] = [];
    @observable totalPages: number = 0;
    @observable dataRequest: any = {
        description: '',
        products: []
    }
    @observable listOption: any[] = [];

    async getOptionList(id: number){
        const result = await receiptService.optionList(id);
        if(result.status === 200){
            this.listOption = result.body;
        }
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
        let products: any[] = [];
        receiptStore.dataRequest.products.map((value: any) => {
            products.push({
                id: value.id,
                options: value.optionList,
                code: value.code,
                name: value.name,
                cost_price: value.costPrice
            })
        })
        let data = {
            description: this.dataRequest.description,
            products: products
        }
        this.isLoading = true;
        const result = await receiptService.addReceipt(data)
        this.isLoading = false;
        if(result.status === 200){
            toastUtil.success('Add Receipt success')
            setTimeout(() => {window.location.href = "/product/receipt"}, 2000)
        }
    }
}

export const receiptStore = new ReceiptStore();
