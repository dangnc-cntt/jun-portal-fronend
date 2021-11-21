import {observable} from "mobx";
import {exportService} from "./ExportService";
import {receiptService} from "../receipts/ReceiptService";
import {toastUtil} from "../../../common/utils/ToastUtil";
import {getDateString, getToDay, minusDays} from "../../../common/utils/Utils";

class ExportStore{
    @observable isLoading: boolean = false;
    @observable page: number = 0;
    @observable exportDetail: any;
    @observable listExport: any[] = [];
    @observable totalPages: number = 0;
    @observable dataRequest: any = {
        description: '',
        products: []
    }
    @observable listOption: any[] = [];
    @observable public gte: Date =  minusDays(getToDay(), 30);
    @observable public lte: Date = getToDay();


    async getOptionList(id: number){
        const result = await receiptService.optionList(id);
        if(result.status === 200){
            this.listOption = result.body;
        }
    }


    async getExport(){
        const gte = this.gte ? getDateString(this.gte) : "";
        const lte = this.lte ? getDateString(this.lte) : "";
        this.isLoading = true;
        const result = await exportService.getExport(gte, lte)
        this.isLoading = false;
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
        let products: any[] = [];
        exportStore.dataRequest.products.map((value: any) => {
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
        const result = await exportService.addExport(data)
        this.isLoading = false;
        if(result.status === 200){
            toastUtil.success('Add Export success');
            setTimeout(() => {window.location.href = "/product/export"}, 2000)
        }
    }




}

export const exportStore = new ExportStore();
