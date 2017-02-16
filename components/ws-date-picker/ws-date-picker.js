import { React, Component } from '../imports';
import moment from 'moment';
import WSDatePickerCalendar from './ws-date-picker-calendar';
import './ws-date-picker.scss';

export default class WSDatePicker extends Component {
	constructor() {
		super();
		this.state = {
			show: false,
			momentDay: null,
			dateString: ''
		};
	}
	toggleCalendar() {
		this.setState({ show: !this.state.show });
	}
	onUpdate(momentDay) {
		this.setState({
			momentDay,
			dateString: momentDay.format('LL')
		});
	}
	render() {
		return <div className='ws-date-picker'>
			<input value={this.state.dateString} placeholder={'Please choose a date'} onClick={() => this.toggleCalendar()} />
			<i className={'icon icon-' + (this.state.show ? 'cross' : 'calendar')} />
			{this.state.show ? <WSDatePickerCalendar onUpdate={(date) => this.onUpdate(date)} momentDay={this.state.momentDay} /> : null}
		</div>
	}
}