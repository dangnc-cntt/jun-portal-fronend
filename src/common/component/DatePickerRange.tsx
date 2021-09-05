import React, {Component} from "react";
import DateRangePicker from 'react-bootstrap-daterangepicker';
import Constants from "../constants/Constants";
import {observer} from "mobx-react";

@observer
class DatePickerRange extends Component<any, any>{

    constructor(props: any) {
        super(props);

        const today = new Date();
        const yesterday = new Date();
        yesterday.setDate(today.getDate() - 1);
        const pre7Day = new Date();
        pre7Day.setDate(today.getDate() - 6);
        const pre30Day = new Date();
        pre30Day.setDate(today.getDate() - 29);
        const pre6Month = new Date();
        pre6Month.setMonth(today.getMonth() - 6);
        this.state = {
            timeFilterText: this.formatDateRange(this.props.startDate, this.props.endDate),
            ranges: {
                'Today': [today, today],
                'Yesterday': [yesterday, yesterday],
                'Last 7 Days': [pre7Day, today],
                'Last 30 Days': [pre30Day, today]
            }
        }
    }

    formatDateRange = (_startDate: string, _endDate:string) => {
        console.log("=====formatDateRange: " + _startDate)
       return (_startDate ? _startDate : "##") + " - " + (_endDate ? _endDate : "##")
    }

    handleChangeTime = (event: any, picker: any) => {
        this.setState({
            timeFilterText:  this.formatDateRange(picker.startDate.format(Constants.DATE_FORMAT), picker.endDate.format(Constants.DATE_FORMAT))
        })
        this.props.handleChangeTime(picker.startDate.format(Constants.DATE_FORMAT), picker.endDate.format(Constants.DATE_FORMAT))
    }

    render() {
        return (
            <DateRangePicker
                initialSettings={{opens: this.props.opens,
                    ranges: this.state.ranges,
                    starDate: this.props.startDate,
                    endDate: this.props.endDate,
                    dateFormat: Constants.DATE_FORMAT,
                    locale: {
                        format: 'YYYY-MM-DD',
                    },
                    autoApply: true,
                    autoUpdateInput: false
                }}
                onApply={this.handleChangeTime}>
                <div className="show d-flex align-items-center">
                    <i className="fal fa-calendar-alt"/>
                    <input className="form-control"
                           value={this.state.timeFilterText}
                           onKeyDown={(e: any) => e.preventDefault()} defaultValue={this.state.timeFilterText}/>
                </div>
            </DateRangePicker>
        )
    }
}

export default DatePickerRange;