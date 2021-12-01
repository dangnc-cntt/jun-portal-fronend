import {observable} from "mobx";
import HttpStatusCode from "../../common/constants/HttpErrorCode";
import {Moment} from "../../common/utils/Moment";
import {dashboardService} from "./DashboardService";
import {getRequest} from "../../common/helpers/RequestHelper";


class DashboardStore {
    @observable public isLoading: boolean = false;
    @observable public dashboard?: any;
    @observable public page: any = 0;
    @observable public pageProduct: number = 0;
    @observable public totalPages: any = 0;
    @observable public date: any = new Date();
    @observable public startDate: Date = Moment.minusDays(Moment.getToDay(), 30);
    @observable public endDate: Date = Moment.getToDay()
    @observable public totalStatistic: any;
    @observable public dataProduct: any;


    async getDashboard() {
        const startDate = this.startDate ? Moment.getDateString(this.startDate) : "";
        const endDate = this.endDate ? Moment.getDateString(this.endDate) : "";
        this.isLoading = true;
        const response = await dashboardService.getDashBoard(startDate, endDate);
        this.isLoading = false;
        if (response.status === HttpStatusCode.OK) {
            this.dashboard = response.body;
            if (response.body.orders) {
                this.totalPages = response.body.orders.metadata.totalPages;
            }
        }
    }

    async getWarehouse(){
        const startDate = this.startDate ? Moment.getDateString(this.startDate) : "";
        const endDate = this.endDate ? Moment.getDateString(this.endDate) : "";
        const response = await getRequest(`/v1/portal/statistic/warehouse?gte=${startDate}&lte=${endDate}&page=${dashboardStore.pageProduct}&size=10`);
        if(response.status === 200){
            this.dataProduct = response.body.products;
        }
    }

}

export const dashboardStore = new DashboardStore();