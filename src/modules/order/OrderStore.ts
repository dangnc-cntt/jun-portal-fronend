import {action, observable} from "mobx";
import HttpStatusCode from "../../common/constants/HttpErrorCode";
import {toastUtil} from "../../common/utils/ToastUtil";
import $ from "jquery";
import {getDateString, getToDay, minusDays} from "../../common/utils/Utils";
import {orderService} from "./OrderService";




class OrderStore {
    @observable public isLoading: boolean = false;
    @observable public orderId: number = 0;
    @observable public listOrder: any[] = [];
    @observable public accountId: string = "";
    @observable public page: number = 0;
    @observable public totalPages: number = 0;
    @observable public gte: Date =  minusDays(getToDay(), 30);
    @observable public lte: Date = getToDay();


    @action async getOrder() {
        const gte = this.gte ? getDateString(this.gte) : "";
        const lte = this.lte ? getDateString(this.lte) : "";
        const result = await orderService.getOrder(gte, lte);
        if (result.status === HttpStatusCode.OK) {
            this.listOrder = result.body.data;
            this.totalPages = result.body.metadata.totalPages;
        }
    }

    async updateStateOrder(){
        const result = await orderService.updateStateOrder(orderStore.orderId);
        if(result.status == 200){
            toastUtil.success("Update state success")
            $('#confirmStatus').trigger('click')
            await this.getOrder();
        }else {
            toastUtil.error(result.body.message)
        }
    }

}

export const orderStore = new OrderStore();
