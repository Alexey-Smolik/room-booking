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
        this.deleteHandler = this.deleteHandler.bind(this);
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
    }

    submitHandler(e) {
        e.preventDefault();

        let start = new Date(this.state.startDate._d),
            end = new Date(this.state.endDate._d);
        start.setTime(start.getTime() - start.getTimezoneOffset()*60*1000 );
        end.setTime(end.getTime() - end.getTimezoneOffset()*60*1000 );

        if(this.props.dateFilter({ start: this.state.startDate._d, end: this.state.endDate._d }, this.props.event.id)) {
            let event = {
                name: this.state.title,
                description: this.state.desc,
                date_from: start,
                date_to: end,
                roomId: this.state.room.id,
                userId: this.state.user.id
            };

            if(this.props.editMode) {
                this.props.editEvent(this.props.event.id , event);
                this.props.closePopup();
            } else {
                this.props.createEvent(event);
                this.props.closePopup();
            }
        }
        else {
            alert("There is event on this date");
        }
    }

    handleChangeDate(e, id){
        if(id) {
            this.setState({ startDate: e });
        } else {
            this.setState({ endDate: e });
        }
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

    deleteHandler(e){
        e.preventDefault();
        this.props.deleteEvent(this.props.event.id);
        this.props.closePopup();
    }

    render() {
        return (
            <div className='overlay'>


                    <form className='popup_inner' onSubmit={this.submitHandler}>
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
                                placeholder="Description"

                            />

                            <div id="date_to">
                            <DatePicker
                                selected={this.state.startDate}
                                onChange={ (e) => this.handleChangeDate(e,1)}
                                showTimeSelect
                                timeFormat="HH:mm"
                                timeIntervals={30}
                                dateFormat="LLL"
                                timeCaption="time"
                            />
                            </div>
                            <DatePicker
                                selected={this.state.endDate}
                                onChange={ (e) => this.handleChangeDate(e,2)}
                                showTimeSelect
                                timeFormat="HH:mm"
                                timeIntervals={30}
                                dateFormat="LLL"
                                timeCaption="time"
                            />

                            <div id="form_button">
                                <Button  /*bsStyle="success" */  type="submit">Confirm</Button>
                                { this.props.editMode ? <Button id="del_canc" /*bsStyle="primary"*/ onClick={this.deleteHandler} >Delete</Button> : null}
                                <Button id="del_canc" /*bsStyle="info"*/ onClick={this.props.closePopup}>Cancel</Button>
                            </div>
                        </FormGroup>

                    </form>
                </div>

        );
    }
}

export default connect(null,actions)(Popup);
