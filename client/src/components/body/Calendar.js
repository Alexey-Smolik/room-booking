import React from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/en-gb';
import { getEvents } from '../../actions';
import { connect } from 'react-redux';
import Popup from './Popup';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import io from 'socket.io-client';
import PropTypes from "prop-types";

//import openSocket from 'socket.io-client';

//const socket = openSocket('http://localhost:8000');
BigCalendar.momentLocalizer(moment);

class Calendar extends React.Component {


    constructor(props){
        super(props);
        this.checkRole = this.checkRole.bind(this);
    }

  state = {
    showPopup: false,
    editMode: false,
    event: '',
  };

  componentWillMount() {
    this.props.dispatch(getEvents(this.props.match.params.roomID));

  }

  dateFilter = (event, eventID = -1) => {
    const eventsArray = this.props.events;

    for (let i = 0; i < eventsArray.length; i++) {
      const start = new Date(eventsArray[i].date_from);
      const end = new Date(eventsArray[i].date_to);
      start.setTime(start.getTime() + start.getTimezoneOffset() * 60 * 1000);
      end.setTime(end.getTime() + end.getTimezoneOffset() * 60 * 1000);

      if (this.state.editMode) {
        if (((((event.start <= start) && (event.end <= end) && (event.end >= start)) ||
                        ((event.start >= start) && (event.end <= end))) ||
                        ((event.start <= start) && (event.end >= end)) ||
                        ((event.start >= start) && (event.end >= end) && (event.start <= end))) ||
                    (eventID > -1 && eventID === eventsArray[i].id)) {
          return true;
        }
      } else if( (((event.start <= start)  && (event.end <= end)  &&  (event.end >= start))  ||
                        ((event.start >= start)  && (event.end <= end)))  ||
                    ((event.start <= start)  && (event.end >= end))   ||
                    ((event.start >= start)  && (event.end >= end)  &&   (event.start <= end))    ) {
                    return false;
                }
    }
    return !this.state.editMode;
  }

  editEvent = (event) => {
    this.setState( (prevState) => ({
      showPopup: !prevState.showPopup,
      event,
      editMode: true
    }))
  };


    addEvent = (event) => {
    if (this.dateFilter(event)) {
      this.setState( (prevState) => ({
        showPopup: !prevState.showPopup,
        event,
      }))
    } else {
      alert('There is event on your date');
    }
  };

  closePopup = () => {
    this.setState((prevState) => ({
      showPopup: !prevState.showPopup,
      event: '',
      editMode: false,
    }))
    };

    checkRole(){
        console.log(this.props.user);
        let role = this.props.user;
        if(role === 1 || role === 2) {
            console.log(role);
            return true;
        }
        alert("You cannot get access");
        return false;
    }

  render() {
    console.log(this.props.events);
    let events = [];
    let { roomID } = this.props.match.params;

    { this.props.events &&  (events = this.props.events.map((event) => {
          const start = new Date(event.date_from);
          const end = new Date(event.date_to);
          start.setTime(start.getTime() + start.getTimezoneOffset() * 60 * 1000);
          end.setTime(end.getTime() + end.getTimezoneOffset() * 60 * 1000);

          return {
            id: event.id,
            description: event.description,
            title: event.name,
            start, end,
          };
      }));
    }



    return (
          <div>
              <React.Fragment>
                  <BigCalendar
                      selectable
                      events={events}
                      defaultView="week"
                      min={moment('2018-02-23 08:00:00').toDate()}
                      max={moment('2018-02-23 19:00:00').toDate()}
                      scrollToTime={new Date(1970, 1, 1, 6)}
                      defaultDate={new Date(2018, 2, 1)}
                      culture="en-GB"
                      onSelectEvent={event => this.editEvent(event)}
                      onSelectSlot={event => this.addEvent(event)}
                    />
                </React.Fragment>

              {(this.state.showPopup && this.checkRole()) &&  <Popup
                      event={this.state.event}
                      user={this.props.user}
                      closePopup={this.closePopup}
                      editMode={this.state.editMode}
                      roomID={roomID}
                      dateFilter={this.dateFilter}/>}
          </div>
    );
  }
}

Calendar.defaultProps = {
    user: {
        role: 3
    }
};


let mapStateToProps = ({ events, user, rooms }) => {
    return {
        rooms,
        user,
        events

    };
}

export default connect(mapStateToProps)(Calendar);
