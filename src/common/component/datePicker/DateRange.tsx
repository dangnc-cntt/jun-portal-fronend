import React, {Component} from "react";
import 'bootstrap-daterangepicker/daterangepicker.css';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import {observer} from "mobx-react";
import {getToDay, minusDays, parserDateFromMiliSecond} from "../../utils/Utils";


interface DatePickerRangeProp {
    opens?: 'left' | 'right' | 'center' | undefined,
    startDate?: Date,
    endDate?: Date,
    handleChangeTime?: (startDate: Date, endDate: Date) => void
}

@observer
class DateRange extends Component<DatePickerRangeProp, any>{

    constructor(props: any) {
        super(props);

        const today = getToDay()
        const yesterday = minusDays(today, 1)
        const pre7Day = minusDays(today, 7)
        const pre30Day = minusDays(today, 30)
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
        this.props.handleChangeTime?.(parserDateFromMiliSecond(picker.startDate), parserDateFromMiliSecond(picker.endDate))
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

export default DateRange;
