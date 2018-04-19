import React, { Component } from 'react';
import { Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import { connect } from 'react-redux';
import { createEvent, deleteEvent , editEvent } from "../../actions/index";
import {NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

class Popup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      startDate: moment(),
      endDate: moment(),
    };
  }

  componentWillMount() {
    this.setState({
        room: this.props.room,
        startDate: moment(this.props.event.start),
        endDate: moment(this.props.event.end),
        title: this.props.event.title,
        description: this.props.event.description,
        user: this.props.user,
        username: this.props.event.user
    });
  };

  submitHandler = (e) => {
    e.preventDefault();
    if(this.state.startDate) {
        if(!this.state.description || (this.state.description && this.state.description.length <= 150)){
            let start = new Date(this.state.startDate._d),
                end = new Date(this.state.endDate._d);
            start.setTime(start.getTime() - start.getTimezoneOffset() * 60 * 1000);
            end.setTime(end.getTime() - end.getTimezoneOffset() * 60 * 1000);

            if((start < end) && ((end-start <= 39600000))) {
                if (this.props.dateFilter({
                        start: this.state.startDate._d,
                        end: this.state.endDate._d
                    }, this.props.event.id)) {
                    if(this.state.title){
                        const event = {
                            name: this.state.title,
                            description: this.state.description,
                            date_from: start,
                            date_to: end,
                            id: this.props.event.id,
                            roomId: this.props.roomID,
                            userId: this.props.user.currentUser.id,
                            username: this.props.user.currentUser.username
                        };

                        if (this.props.editMode) {
                            this.props.dispatch(editEvent(this.props.event.id, event));
                            this.createNotification('edit event')();
                            this.props.closePopup();
                        } else {
                            this.props.dispatch(createEvent(event));
                            this.createNotification('add event')();
                            this.props.closePopup();
                        }
                    }
                    else this.createNotification('wrong values')();
                } else {
                    (this.createNotification('date')());
                }
            }else {
                this.createNotification('start end date')();
            }
        } else this.createNotification('desc size')();
    } else {
        this.createNotification('empty event')();
    }
  };

  createNotification = (type) => {
      return () => {
          switch (type) {
              case 'date':
                  NotificationManager.warning('Sorry, this room is already booked for this date!', 'Date', 3000);
                  break;
              case 'add event':
                  NotificationManager.success('You successfully added event!', 'Event', 3000);
                  break;
              case 'edit event':
                  NotificationManager.success('You successfully edited event!', 'Event', 3000);
                  break;
              case 'delete event':
                  NotificationManager.success('You successfully deleted event!', 'Event', 3000);
                  break;
              case 'start end date':
                  NotificationManager.warning('Incorrect data value! Please, correct it!', 'Event', 3000);
                  break;
              case 'wrong values':
                  NotificationManager.error('Please, fill the fields!', 'Event', 3000);
                  break;
              case 'desc size':
                  NotificationManager.error('Character limit exceeded in the description field!', 'Event', 3000);
                  break;
              default:
                  NotificationManager.success('Smth wrong with server!', 'Event', 3000);
          }
      };
  };


  handleChangeDate = (e, isFirstdataPicker) => {
    if (isFirstdataPicker) {
      this.setState({ startDate: e });
    } else {
      this.setState({ endDate: e });
    }
  };

  handleChangeTitle = (e) => {
    e.preventDefault();
    this.setState({ title: e.target.value });
  };

  handleChangeDesc = (e) => {
    e.preventDefault();
    this.setState({ description: e.target.value });
  };

  deleteHandler = (e) => {
    e.preventDefault();
    this.props.dispatch(deleteEvent(this.props.event.id));
    (this.createNotification('delete event')());
    this.props.closePopup();
  };

  userHaveAccess = () => {
      if(this.props.roomID === 'all') {
          return false;
      }else if (this.props.user.currentUser.role === 1) {
          return true
      } else if (this.props.user.currentUser.role === 2) {
          if (!this.props.editMode || (this.props.editMode && this.props.event.userId === this.props.user.currentUser.id)) {
              return true
          }
      } else {
          return false
      }
  };

  render() {
    return (
      <div className="overlay">
        <form className="popup_inner" onSubmit={this.submitHandler}>
            {this.userHaveAccess() ?
                    <FormGroup controlId="formBasicText">
                        <ControlLabel>Creator</ControlLabel>
                        <FormControl
                            type="text"
                            disabled
                            value= { this.props.editMode ? this.state.username : this.props.user.currentUser.username }
                        />

                        <ControlLabel>Title</ControlLabel>
                        <FormControl
                            maxLength={100}
                            type="text"
                            value={this.state.title}
                            onChange={this.handleChangeTitle}
                        />

                        <ControlLabel>Description</ControlLabel>
                        <textarea
                            maxLength={150}
                            value={this.state.description}
                            onChange={this.handleChangeDesc}
                        />

                        <div id="date_to">
                            <DatePicker
                                readOnly
                                selected={this.state.startDate}
                                onChange={e => this.handleChangeDate(e, true)}
                                showTimeSelect
                                timeFormat="HH:mm"
                                minTime={moment().hours(8).minutes(0)}
                                maxTime={moment().hours(19).minutes(0)}
                                timeIntervals={30}
                                dateFormat="LLL"
                                timeCaption="time"
                            />
                        </div>

                        <DatePicker
                            readOnly
                            selected={this.state.endDate}
                            onChange={e => this.handleChangeDate(e, false)}
                            showTimeSelect
                            timeFormat="HH:mm"
                            minTime={moment().hours(8).minutes(0)}
                            maxTime={moment().hours(19).minutes(0)}
                            timeIntervals={30}
                            dateFormat="LLL"
                            timeCaption="time"
                        />

                        <div id="form_button">
                            <Button id="del_canc" type="submit">Confirm</Button>
                            {this.props.editMode && <Button id="del_canc"  onClick={this.deleteHandler} >Delete</Button> }
                            <Button id="del_canc"  onClick={this.props.closePopup}>Close</Button>
                        </div>
                    </FormGroup>
                    :
                    <FormGroup controlId="formBasicText">
                        <ControlLabel style={{ marginLeft: '40%' }}>Creator</ControlLabel>
                        <div style={{ fontSize: '16px', marginBottom: '15px', textAlign: 'center' }} >{ this.props.editMode ? this.state.username : this.props.user.currentUser.username }</div>

                        <ControlLabel style={{ marginLeft: '45%' }}>Title</ControlLabel>
                        <div style={{ fontSize: '16px', marginBottom: '15px', textAlign: 'center', wordBreak: 'break-word' }} >{this.state.title}</div>

                        <ControlLabel style={{ marginLeft: '37%' }}>Description</ControlLabel>
                        <div style={{ fontSize: '16px', marginBottom: '20px', textAlign: 'center', wordBreak: 'break-word' }} >{this.state.description}</div>


                        <div id="date_to">
                            <DatePicker
                                disabled={true}
                                readOnly
                                selected={this.state.startDate}
                                onChange={e => this.handleChangeDate(e, true)}
                                showTimeSelect
                                timeFormat="HH:mm"
                                timeIntervals={30}
                                dateFormat="LLL"
                                timeCaption="time"
                            />
                        </div>

                        <DatePicker
                            disabled={true}
                            readOnly
                            selected={this.state.endDate}
                            onChange={e => this.handleChangeDate(e, false)}
                            showTimeSelect
                            timeFormat="HH:mm"
                            timeIntervals={30}
                            dateFormat="LLL"
                            timeCaption="time"
                        />

                        <div id="form_button">
                            <Button id="del_canc"  onClick={this.props.closePopup}>Close</Button>
                        </div>
                    </FormGroup> }
        </form>
      </div>

    );
  }
}

export default connect()(Popup);
