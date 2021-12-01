import {action, observable} from "mobx";
import {orderService} from "../order/OrderService";
import HttpStatusCode from "../../common/constants/HttpErrorCode";
import {toastUtil} from "../../common/utils/ToastUtil";
import $ from "jquery";
import {orderStore} from "../order/OrderStore";
import {getRequest, putRequest} from "../../common/helpers/RequestHelper";

class ReviewStore {
    @observable public isLoading: boolean = false;
    @observable public reviewId: string = '';
    @observable public productId: string = '';
    @observable public state: string = '';
    @observable public accountId: string = "";
    @observable public page: number = 0;
    @observable public totalPages: number = 0;
    @observable public listReview: any[] = [];

    async getReview() {
       try {
           const result = await getRequest(`/v1/portal/reviews?page=${this.page}&size=10${this.accountId ? `&accountId=${this.accountId}` : ''}${this.productId ? `&productId=${this.productId}` : ''}${this.state ? `&state=${this.state}` : ''}`);
           if (result.status === HttpStatusCode.OK) {
               this.listReview = result.body.data;
               this.totalPages = result.body.metadata.totalPages;
           }
       }catch (e) {
           return true
       }
    }

    async updateState() {
        const result = await putRequest(`/v1/portal/reviews/${this.reviewId}`, {});
        if (result.status == 200) {
            toastUtil.success("Update state success")
            $('#confirmState').trigger('click')
            await this.getReview();
        } else {
            toastUtil.error(result.body.message)
        }
    }
}

export const reviewStore = new ReviewStore()