import React from 'react';
import DatePicker from "react-datepicker";
import moment from 'moment';
import * as actions from '../actions';
import {connect} from 'react-redux';
import TopLoginSection from "./TopLoginSection";


// Imports in Header.js, changing rooms state and change it back.

class SearchEmptyRoom extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        startDate: moment(),
        endDate: moment(),
        response: ""
    };

    this.submitHandler = this.submitHandler.bind(this);
    this.handleChangeStart = this.handleChangeStart.bind(this);
    this.handleChangeEnd = this.handleChangeEnd.bind(this);

  }

  submitHandler(e) {
    e.preventDefault();
    let start = new Date(this.state.startDate._d),
          end = new Date(this.state.endDate._d);

    this.setState({
      response: this.props.getRoomsByDate(start, end)
    });
  }

  handleChangeStart(date) {
    this.setState({
      startDate: date
    });
  }

  handleChangeEnd(date) {
    this.setState({
      endDate: date
    });
  }

  render() {

      var user = this.props.user && this.props.user.username;

    return(
        user ?
      <div className='dates_filter'>
        <div id='filter_date_from'>
          <p className='start'>Start:</p>
          <DatePicker
            selected={this.state.startDate}
            selectsStart
            dateFormat="LLL"
            startDate={this.state.startDate}
            endDate={this.state.endDate}
            onChange={this.handleChangeStart}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={30}
            timeCaption="time"
          />
        </div>
        <div id='filter_date_to'>
          <p className='end'>End:</p>
          <DatePicker
            selected={this.state.endDate}
            selectsEnd
            dateFormat="LLL"
            startDate={this.state.startDate}
            endDate={this.state.endDate}
            onChange={this.handleChangeEnd}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={30}
            timeCaption="time"
          />
        </div>
        <div className="buttons_filter">
          <button className='filter_btn' onClick={this.submitHandler}>Search</button>
          <button className='filter_btn' onClick={() => this.props.getRooms()}>Cancel</button>

            <TopLoginSection user={this.props.user}/>
        </div>
      </div>
            :null
    );     
  }
}

function mapStateToProps({ rooms }) {
  return {
      rooms: rooms
  }
}

export default connect(mapStateToProps,actions)(SearchEmptyRoom);
