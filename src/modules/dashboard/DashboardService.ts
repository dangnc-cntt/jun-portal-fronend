import {getRequest, IApiResponse} from "../../common/helpers/RequestHelper";
import {dashboardStore} from "./DashboardStore";

class DashboardService {

    public getDashBoard(startDate: any, endDate: any): Promise<IApiResponse> {
        return getRequest(`/v1/portal/statistic/revenue?gte=${startDate}&lte=${endDate}&page=${dashboardStore.page}&size=10`)
    }

}

export const dashboardService = new DashboardService();