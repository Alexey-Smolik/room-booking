import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { getRoomsByDate, getRooms, deleteCurrentUser } from '../../actions';
import TopLoginSection from './TopLoginSection';


// Imports in Header.js, changing rooms state and change it back.

class TopEventSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: moment(),
      endDate: moment(),
    };

    this.submitHandler = this.submitHandler.bind(this);
    this.handleChangeStart = this.handleChangeStart.bind(this);
    this.handleChangeEnd = this.handleChangeEnd.bind(this);
  }

  submitHandler(e) {
    e.preventDefault();
    const start = new Date(this.state.startDate._d);
    const end = new Date(this.state.endDate._d);
    this.props.dispatch(getRoomsByDate(start, end));
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

  render() {
    const { user } = this.props;
    return (
      <div className="dates_filter">
        <div id="filter_date_from">
          <p className="start">Start:</p>
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
          <p className="end">End:</p>
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
          <button className="filter_btn" onClick={e => this.submitHandler}>Search</button>
          <button className="filter_btn" onClick={() => this.props.dispatch(getRooms())}>Cancel</button>


          <TopLoginSection user={user} logout={() => this.props.dispatch(deleteCurrentUser())} />
        </div>
      </div>
    );
  }
}

TopEventSearch.defaultProps = {
  user: 'undefined',
};

TopEventSearch.propTypes = {
  user: PropTypes.object,
};

export default connect()(TopEventSearch);
