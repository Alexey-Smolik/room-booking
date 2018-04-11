import React, { Component } from 'react';
import { Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import { connect } from 'react-redux';
import { createEvent, deleteEvent , editEvent } from "../../actions/index";

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
    let start = new Date(this.state.startDate._d),
        end = new Date(this.state.endDate._d);
    start.setTime(start.getTime() - start.getTimezoneOffset() * 60 * 1000);
    end.setTime(end.getTime() - end.getTimezoneOffset() * 60 * 1000);

      if (this.props.dateFilter({ start: this.state.startDate._d, end: this.state.endDate._d }, this.props.event.id)) {
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
        this.props.closePopup();

      } else {

        this.props.dispatch(createEvent(event));
        this.props.closePopup();

      }
    } else {
      alert('There is event on this date');
    }
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
    this.props.closePopup();
  };

  render() {
    console.log(this.state);
    return (
      <div className="overlay">
        <form className="popup_inner" onSubmit={this.submitHandler}>
          <FormGroup controlId="formBasicText">
            <ControlLabel>Username</ControlLabel>
            <FormControl
              type="text"
              disabled
              value= { this.props.editMode ? this.state.username : this.props.user.currentUser.username }
              placeholder="Title"
            />
            <ControlLabel>Title</ControlLabel>
            <FormControl
              type="text"
              value={this.state.title}
              onChange={this.handleChangeTitle}
              placeholder="Title"
            />
            <ControlLabel>Description</ControlLabel>
            <textarea
              value={this.state.description}
              onChange={this.handleChangeDesc}
              placeholder="Description"
            />

            <div id="date_to">
              <DatePicker
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
              <Button id="del_canc" type="submit">Confirm</Button>
              { this.props.editMode ? <Button id="del_canc"  onClick={this.deleteHandler} >Delete</Button> : null}
              <Button id="del_canc"  onClick={this.props.closePopup}>Cancel</Button>
            </div>
          </FormGroup>

        </form>
      </div>

    );
  }
}

export default connect()(Popup);
