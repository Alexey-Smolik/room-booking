import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import {  getRooms, getRoomsByDate } from '../../actions';


// Imports in Header.js, changing rooms state and change it back.

class SearchEmptyRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: '',
      endDate: '',
      pmUsers: '',
      stateChange: true
    };

    this.submitHandler = this.submitHandler.bind(this);
    this.handleChangeStart = this.handleChangeStart.bind(this);
    this.handleChangeEnd = this.handleChangeEnd.bind(this);
    this.selectValue = this.selectValue.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  submitHandler(e) {
      e.preventDefault();

      let start = new Date(this.state.startDate._d);
      let end = this.state.endDate ?  new Date(this.state.endDate._d) : start;

      start = new Date(start.getFullYear(), start.getMonth(), start.getDate(), start.getHours(), start.getMinutes());
      end = this.state.endDate ?
          new Date(end.getFullYear(), end.getMonth(), end.getDate(), end.getHours(), end.getMinutes()) :
          new Date(end.getFullYear(), end.getMonth(), end.getDate(), end.getHours(), 30 + end.getMinutes());
      this.props.dispatch(getRoomsByDate(start, end));
  }


  componentDidUpdate() {
    if(this.state.stateChange === true) {
       if(this.props.user.allUsers) {

        var arr = this.props.user.allUsers.filter( (item) => {
          if(item.role < 3) {
            return item
          }
        });

        this.setState({
          pmUsers: arr,
          stateChange: false
        });
      }
    }
  }

  handleChangeStart(date) {
    this.setState({
      startDate: date,
    });
  }

  handleChangeEnd(date) {
    this.setState({
      endDate: date,
    });
  }

  selectValue(e) {
    this.setState({
      stateChange: e
    })
  }

  handleSelect() {
      console.log(this.state.stateChange)
      console.log(this.props)
  }

  selectOptions() {
    return this.state.pmUsers.map( (item, index) => {
      return({
        label: item.username,
        id: index
      })
    });
  }

  render() {
    return (
      <div className="dates_filter">
          <div className='dates_picker_cont'>
            <div id="filter_date_from">
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
            <div id="filter_date_to">
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
              <button className="filter_btn" onClick={(e) => this.submitHandler(e)}>Search</button>
              <button className="filter_btn" onClick={() => this.props.dispatch(getRooms())}>Cancel</button>

            </div>
          </div>
        </div>
    );
  }
}



export default connect()(SearchEmptyRoom);
