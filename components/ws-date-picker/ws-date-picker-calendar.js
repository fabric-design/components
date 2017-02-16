import { React, Component } from '../imports';
import WSDatePickerCalendarWeek from './ws-date-picker-calendar-row.js';
import moment from 'moment';

let localeData = moment.localeData();

export default class WSDatePickerCalendar extends Component {
	constructor() {
		super();
		this.state = {
			year: moment().year(),
			month: moment().month(),
			monthName: localeData.months(moment()),
		}
	}

	prevMonth() {
		let month = this.state.month - 1;
		this.setState({
			month,
			monthName: localeData.months(moment().year(this.state.year).month(month))
		})
	}

	nextMonth() {
		let month = this.state.month + 1;
		this.setState({
			month,
			monthName: localeData.months(moment().year(this.state.year).month(month))
		})
	}

	render() {
		let momentMonth = moment().year(this.state.year).month(this.state.month).date(1);
		let startWeek = momentMonth.isoWeek();
		let endWeek = momentMonth.month(momentMonth.month() + 1).date(-1).isoWeek();
		var weeks = [];
		for (var week = startWeek; week <= endWeek; week++) {
			weeks.push(<WSDatePickerCalendarWeek
				weeknum={week}
				year={this.state.year}
				month={this.state.month}
				momentDay={this.props.momentDay}
				key={week}
				onUpdate={(momentDay) => this.props.onUpdate(momentDay)}
				/>);
		}
		return <div className="ws-date-picker-calendar">
				<table>
					<caption>
						<span className="prev" onClick={() => this.prevMonth()}><a href="#"><i className="icon icon-left" /></a></span>
						<span className="next" onClick={() => this.nextMonth()}><a href="#"><i className="icon icon-right" /></a></span>
						{this.state.monthName} {this.state.year}
					</caption>
					<thead>
						<tr>
							<th className='off'>CW</th>
							<th className='off'>Mo</th>
							<th className='off'>Tu</th>
							<th className='off'>We</th>
							<th className='off'>Th</th>
							<th className='off'>Fr</th>
							<th className='off'>Sa</th>
							<th className='off'>Su</th>
						</tr>
					</thead>
					<tbody>
						{weeks}
					</tbody>
				</table>
			</div>
	}
}