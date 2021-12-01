import React, {Component} from 'react';
import {observer} from "mobx-react";
import NoContent from "./NoContent";
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';

@observer
class ChartStatistics extends Component<{ dataStatistic: any, type?: string}, any> {


    render() {

        let dataExport: any = [];
        let dataReceipt: any = [];
        let total: any = [];
        let spending: any = [];
        let actual: any = [];
        let discount: any = [];
        let totalOrder: any = [];
        let totalProduct: any = [];
        let statisticDate: any = [];

        if(this.props.type == "dashboard"){
            statisticDate = statisticDate.concat([{
                name: 'Total revenue',
                data: total
            },
                {
                    name: 'Total expenditure',
                    data: spending
                },
                {
                    name: 'Actual profit',
                    data: actual
                },
                {
                    name: 'Discount',
                    data: discount
                },
                {
                    name: 'Total Order',
                    data: totalOrder
                },
                {
                    name: 'Total Product',
                    data: totalProduct
                }
            ])
        }else {
            statisticDate = statisticDate.concat([{
                    name: 'Export',
                    data: dataExport
                },
                {
                    name: 'Receipt',
                    data: dataReceipt
                }
            ])
        }


        if(this.props.dataStatistic) {
            for(let i = 0; i < this.props.dataStatistic.length; i++) {
                let item = this.props.dataStatistic[i];
                if(this.props.type == "dashboard"){
                    total.push([Date.parse(item.date), parseInt(item.statistic.total)])
                    spending.push([Date.parse(item.date), parseInt(item.statistic.spending)])
                    actual.push([Date.parse(item.date), parseInt(item.statistic.actual)])
                    discount.push([Date.parse(item.date), parseInt(item.statistic.discount)])
                    totalOrder.push([Date.parse(item.date), parseInt(item.statistic.totalOrder)])
                    totalProduct.push([Date.parse(item.date), parseInt(item.statistic.totalProduct)])
                }else {
                    dataExport.push([Date.parse(item.date), parseInt(item.amount.export)])
                    dataReceipt.push([Date.parse(item.date), parseInt(item.amount.receipt)])
                }
            }
        }


        const chartOptions = {
            title: {
                text: ''
            },
            xAxis: {
                gridLineWidth: 1,
                type: 'datetime',
                labels: {
                    format: "{value:%Y-%m-%d}",
                    rotation: -50,
                    align: 'right'
                }
            },
            legend: {
                align: 'left',
                verticalAlign: 'top',
                borderWidth: 0
            },

            tooltip: {
                shared: true,
                crosshairs: true
            },
            series: statisticDate
        }

        return (
            <div className="chart">
                {this.props.dataStatistic && this.props.dataStatistic.length > 0 ?
                    <HighchartsReact
                        highcharts={Highcharts}
                        options={chartOptions}
                    /> : <NoContent message={'No data to display'}/>}
            </div>
        )

    }
}

export default ChartStatistics;