import { React, Component } from '../imports';
import moment from 'moment';
import WSDatePickerCalendar from './ws-date-picker-calendar';
import './ws-date-picker.scss';

export class WSDatePicker extends Component {
	constructor(props) {
		super(props);
		let momentDay = this.props.date ? moment(this.props.date) : null;
		this.state = {
			show: false,
			momentDay,
			dateString: momentDay ? momentDay.format('LL') : ''
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
		this.props.onUpdate && this.props.onUpdate(momentDay.toDate());
	}
	render() {
		return <div className='ws-date-picker'>
			<input value={this.state.dateString} placeholder={'Please choose a date'} onClick={() => this.toggleCalendar()} />
			<i className={'icon icon-' + (this.state.show ? 'cross' : 'calendar')} />
			{this.state.show ? <WSDatePickerCalendar onUpdate={(date) => this.onUpdate(date)} momentDay={this.state.momentDay} /> : null}
		</div>
	}
}