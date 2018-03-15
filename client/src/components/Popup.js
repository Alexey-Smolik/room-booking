import React from 'react';
import { Button, FormGroup , ControlLabel , FormControl } from 'react-bootstrap';
import  DatePicker from "react-datepicker";
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

class Popup extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            title: '',
            desc: '',
            startDate: moment(),
            endDate: moment()
        };
        this.submitHandler = this.submitHandler.bind(this);
    }

    componentWillMount(){
        this.setState({
            startDate: moment(this.props.event.start),
            endDate: moment(this.props.event.end),
            title: this.props.event.title,
            desc: this.props.event.desc
        });

        /*if(this.props.editMode) {

        }*/
    }

    submitHandler(e) {
        e.preventDefault();
    }

    handleChangeDate(date) {
        /*if(date > moment() ) {
            alert("Date of birthday cannot be less than " + moment()._d.toLocaleDateString());
            this.setState({ startDate: moment() });

        } else {
            this.setState({ startDate: date });
        }*/
    }

    handleChangeTitle(){

    }

    handleChangeDesc(){

    }

    render() {
        return (
            <div className='popup'>
                <div className='popup_inner'>

                    <form onSubmit={this.submitHandler}>
                        <FormGroup
                            controlId="formBasicText">

                            <ControlLabel>Title</ControlLabel>
                            <FormControl
                                type="text"
                                value={this.state.title}
                                onChange={this.handleChangeTitle}
                                placeholder="Title"
                            />

                            <ControlLabel>Description</ControlLabel>
                            <FormControl
                                type="text"
                                value={this.state.desc}
                                onChange={this.handleChangeDesc}
                                placeholder="Decription"
                            />

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
                        </FormGroup>

                        <Button bsStyle="success" type="submit">Confirm</Button>
                        <Button bsStyle="warning" onClick={this.props.close}>Cancel</Button>
                        <Button bsStyle="success" type="reset">Delete</Button>
                    </form>
                </div>
            </div>
        );
    }
}

export default Popup;

