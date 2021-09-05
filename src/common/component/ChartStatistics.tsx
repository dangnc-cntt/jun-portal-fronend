import React, {Component} from 'react';
import {observer} from "mobx-react";
import NoContent from "./NoContent";
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';

@observer
class ChartStatistics extends Component<{ dataStatistic: any}, any> {
    render() {

        let transactionData: any = [];
        let payerData: any = [];
        let revenueData: any = [];
        let statisticDate: any = [];

        statisticDate = statisticDate.concat([
                {
                    name: 'Total Transaction',
                    data: transactionData
                },
                {
                    name: 'Total Payer',
                    data: payerData
                },
                {
                    name: 'Total Revenue',
                    data: revenueData
                }
        ])

        if(this.props.dataStatistic) {
            for(let i = 0; i < this.props.dataStatistic.length; i++) {
                let item = this.props.dataStatistic[i];
                transactionData.push([Date.parse(item.daily), parseInt(item.transactionCount)])
                payerData.push([Date.parse(item.daily), parseInt(item.payerCount)])
                revenueData.push([Date.parse(item.daily), parseInt(item.revenue)])
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
            <div className="mt-2 mb-5">
                <div className="d-flex title_top justify-content-between mt-2 align-items-center mb-3">
                    <span style={{width: `96%`}}/>
                </div>
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