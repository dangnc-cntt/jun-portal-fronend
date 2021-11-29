/** @jsxImportSource @emotion/core */
import React, {Component} from 'react';
import {observer} from "mobx-react";
import NoContent from "./NoContent";
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';

@observer
class ChartStatistics extends Component<{ dataStatistic: any, startDate?: string, endDate?: string, showAll?: boolean}, any> {
    render() {

        let requestData: any = [];
        let impressionData: any = [];
        let clickData: any = [];
        let completeData: any = [];
        let skipData: any = [];

        let statisticDate: any = [];

        if(this.props.showAll) {
            statisticDate = statisticDate.concat([{
                name: 'Request',
                data: requestData
            },
            {
                name: 'Impression',
                data: impressionData
            },
            {
                name: 'Click',
                data: clickData
            },
            {
                name: 'Complete',
                data: completeData
            },
            {
                name: 'Skip',
                data: skipData
            }
            ])
        }else{
            statisticDate = statisticDate.concat([{
                name: 'Impression',
                data: impressionData
            },
            {
                name: 'Click',
                data: clickData
            }])
        }

        if(this.props.dataStatistic) {
            for(let i = 0; i < this.props.dataStatistic.length; i++) {
                let item = this.props.dataStatistic[i];
                requestData.push([Date.parse(item.date), parseInt(item.total.request)])
                impressionData.push([Date.parse(item.date), parseInt(item.total.impression)])
                clickData.push([Date.parse(item.date), parseInt(item.total.click)])
                completeData.push([Date.parse(item.date), parseInt(item.total.complete)])
                skipData.push([Date.parse(item.date), parseInt(item.total.skip)])
            }
        }

        // console.log(statisticDate)

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
            <div className="">
                <div className="d-flex title_top justify-content-between mt-2 align-items-center mb-3">
                    {/*<h4 className="text-muted">Statistics from {this.props.startDate} to {this.props.endDate}</h4>*/}
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