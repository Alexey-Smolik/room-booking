import React from 'react';
import { Button, FormGroup , ControlLabel , FormControl } from 'react-bootstrap';
import  DatePicker from "react-datepicker";
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import * as actions from '../actions';
import {connect} from "react-redux";

class Popup extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            room: '',
            title: '',
            desc: '',
            user: '',
            startDate: moment(),
            endDate: moment(),

        };
        this.submitHandler = this.submitHandler.bind(this);
        this.handleChangeDate = this.handleChangeDate.bind(this);
        this.handleChangeTitle = this.handleChangeTitle.bind(this)
        this.handleChangeDesc = this.handleChangeDesc.bind(this);
    }

    componentWillMount(){
        this.setState({
            room: this.props.room,
            startDate: moment(this.props.event.start),
            endDate: moment(this.props.event.end),
            title: this.props.event.title,
            desc: this.props.event.desc,
            user: this.props.user
        });
        /*if(this.props.editMode) {

        }*/
    }

    submitHandler(e) {
        e.preventDefault();

        let start = new Date(this.state.startDate._d),
            end = new Date(this.state.endDate._d);

        let event = {
            name: this.state.title,
            description: this.state.desc,
            date_from: new Date(Date.UTC(start.getFullYear(), start.getMonth(), start.getDate(), start.getHours(), start.getMinutes())),
            date_to: new Date(Date.UTC(end.getFullYear(), end.getMonth(), end.getDate(), end.getHours(), end.getMinutes())),
            roomId: this.state.room.id,
            userId: this.state.user.id
        };

        this.props.createEvent(event);
    }

    handleChangeDate(e) {
        e.preventDefault();
        /*if(date < moment() ) {
            alert("Date of birthday cannot be less than");
            this.setState({ startDate: moment() });

        } else {
            this.setState({ startDate: date });
        }*/
    }

    handleChangeUsername(e){
        e.preventDefault();
        this.setState({ username: e.target.value });
    }

    handleChangeTitle(e){
        e.preventDefault();
        this.setState({ title: e.target.value });
    }

    handleChangeDesc(e){
        e.preventDefault();
        this.setState({ desc: e.target.value });
    }

    render() {
        return (
            <div className='popup'>
                <div className='popup_inner'>

                    <form id="popup_form" onSubmit={this.submitHandler}>
                        <FormGroup controlId="formBasicText">
                            <ControlLabel>Username</ControlLabel>
                            <FormControl
                                type="text"
                                disabled
                                value={this.state.user.username}
                                onChange={this.handleChangeUsername}
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
                                //type="text"
                                value={this.state.desc}
                                onChange={this.handleChangeDesc}
                                //placeholder="Decription"
                            />
                            <div id = "date">
                            <DatePicker
                                selected={this.state.startDate}
                                onChange={this.handleChangeDate}
                                showTimeSelect
                                timeFormat="HH:mm"
                                timeIntervals={30}
                                dateFormat="LLL"
                                timeCaption="time"
                            />

                            <DatePicker
                                selected={this.state.endDate}
                                onChange={this.handleChangeDate}
                                showTimeSelect
                                timeFormat="HH:mm"
                                timeIntervals={30}
                                dateFormat="LLL"
                                timeCaption="time"
                            />

                            </div>

                        </FormGroup>
                        <div id="form_button">
                        <Button bsStyle="success" type="submit">Confirm</Button>
                        <Button bsStyle="info" type="reset">Delete</Button>
                        <Button bsStyle="primary" onClick={this.props.close}>Cancel</Button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default connect(null,actions)(Popup);

