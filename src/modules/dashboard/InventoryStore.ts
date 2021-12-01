import {observable} from "mobx";
import {Moment} from "../../common/utils/Moment";
import {getRequest} from "../../common/helpers/RequestHelper";


class InventoryStore {
    @observable public isLoading: boolean = false;
    @observable public dashboard?: any;
    @observable public page: any = 0;
    @observable public totalPages: any = 0;
    @observable public startDate: Date = Moment.minusDays(Moment.getToDay(), 30);
    @observable public endDate: Date = Moment.getToDay()
    @observable public totalStatistic: any;


    async getWarehouse(){
        const startDate = this.startDate ? Moment.getDateString(this.startDate) : "";
        const endDate = this.endDate ? Moment.getDateString(this.endDate) : "";
        const response = await getRequest(`/v1/portal/statistic/warehouse?gte=${startDate}&lte=${endDate}&page=${this.page}&size=10`);
        if(response.status === 200){
            this.dashboard = response.body;
            if (response.body.products) {
                this.totalPages = response.body.products.metadata.totalPages;
            }
        }
    }

}

export const inventoryStore = new InventoryStore();