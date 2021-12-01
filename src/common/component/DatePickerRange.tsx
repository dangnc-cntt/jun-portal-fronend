import React, {Component} from "react";
import DateRangePicker from 'react-bootstrap-daterangepicker';
import Constants from "../constants/Constants";
import {observer} from "mobx-react";
import {Moment} from "../utils/Moment";

@observer
class DatePickerRange extends Component<any, any>{
    constructor(props: any) {
        super(props);

        const today = Moment.getToDay()
        const yesterday = Moment.minusDays(today, 1)
        const pre7Day = Moment.minusDays(today, 7)
        const pre30Day = Moment.minusDays(today, 30)
        this.state = {
            ranges: {
                'Today': [today, today],
                'Yesterday': [yesterday, yesterday],
                'Last 7 Days': [pre7Day, today],
                'Last 30 Days': [pre30Day, today]
            }
        }
    }

    onApply = (event: any, picker: any) => {
        this.props.handleChangeTime?.(Moment.parserDateFromMiliSecond(picker.startDate), Moment.parserDateFromMiliSecond(picker.endDate))
    }

    render() {
        return (
            <div className="show d-flex align-items-center">
                <i className="fal fa-calendar-alt"/>
                <DateRangePicker
                    initialSettings={{opens: this.props.opens,
                        ranges: this.state.ranges,
                        startDate: this.props.startDate,
                        endDate: this.props.endDate,
                        locale: {
                            format: 'yyyy/MM/DD',
                        },
                        autoApply: true,
                        autoUpdateInput: true
                    }}
                    onApply={this.onApply}>
                    <input type="text" className="form-control"/>
                </DateRangePicker>
            </div>
        )
    }
}

export default DatePickerRange;