import {observable} from "mobx";
import HttpStatusCode from "../../common/constants/HttpErrorCode";
import {Moment} from "../../common/utils/Moment";
import {dashboardService} from "./DashboardService";


class DashboardStore {
    @observable public isLoading: boolean = false;
    @observable public dashboard?: any;
    @observable public page: any = 0;
    @observable public totalPages: any = 0;
    @observable public date: any = new Date();
    @observable public startDate: Date = new Date();
    @observable public endDate: Date = new Date()
    @observable public totalStatistic: any;


    async getDashboard(){
        const startDate = this.startDate ? Moment.getDateString(this.startDate) : "";
        const endDate = this.endDate ? Moment.getDateString(this.endDate) : "";
        this.isLoading = true;
        const response =  await dashboardService.getDashBoard(startDate, endDate);
        this.isLoading = false;
        if(response.status === HttpStatusCode.OK){
            this.dashboard = response.body;
            if(response.body.orders){
                this.totalPages = response.body.orders.metadata.totalPages;
            }
        }
    }

}

export const dashboardStore = new DashboardStore();