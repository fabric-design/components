import { React, Component } from '../imports';
import moment from 'moment';

export class WSDatePickerCalendarWeek extends Component {
	isInMonth(momentDay, expectedMonth) {
		return momentDay.month() === expectedMonth;
	}
	isActive(year, month, date) {
		return this.props.momentDay
			&& year === this.props.momentDay.year()
			&& month === this.props.momentDay.month()
			&& date === this.props.momentDay.date();
	}
	render() {
		let {weekNumber, month, year} = this.props;
		let momentWeek = moment().year(year).week(weekNumber);
		let weekDays = [];
		for (let day = 0; day < 7; day++) {
			let momentDay = momentWeek.day(day);
			let date = momentDay.date();
			weekDays.push(
				<td className={ (this.isInMonth(momentDay, month) ? '' : 'off ') +
								(this.isActive(momentDay.year(), momentDay.month(), date) ? 'active' : '') }
					key={date}
					onClick={() => this.props.onUpdate(momentWeek.day(day))}
					>
					<a href="#" className='day'>{date}</a>
				</td>);
		}
		return <tr>
			<td className='off'>{weekNumber}</td>
			{weekDays}
		</tr>;
	}
}

class WSDatePickerWeekDay extends Component {
	render() {
		return <td className={ this.props.off ? 'off' : '' }><a href="#">{this.props.date}</a></td>
	}
}
