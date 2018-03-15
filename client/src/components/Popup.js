import React from 'react';
import { Button, FormGroup , ControlLabel , FormControl } from 'react-bootstrap';
import  DatePicker from "react-datepicker";
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

class Popup extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
            surname: '',
            startDate: moment()
        };
        this.submitHandler = this.submitHandler.bind(this);
    }

    componentWillMount(){
        if(this.props.editMode) {
            const user = this.props.user;
            this.setState({
                name: user.name,
                surname: user.surname,
                startDate: user.date
            });
        }
    }

    submitHandler(e) {
        e.preventDefault();
        if(this.state.name.length > 1) {
            if(this.props.editMode) {
                this.props.editNote({
                    id: this.props.user.id,
                    name: this.state.name,
                    surname: this.state.surname,
                    date: this.state.startDate
                });
                this.props.close();
            } else {
                this.props.addNote({
                    id: this.props.id,
                    name: this.state.name,
                    surname: this.state.surname,
                    date: this.state.startDate
                });
            }
            this.props.close();
        } else {
            alert("Name cannot be null");
        }
    }

    handleChangeDate(date) {
        if(date > moment() ) {
            alert("Date of birthday cannot be less than " + moment()._d.toLocaleDateString());
            this.setState({ startDate: moment() });

        } else {
            this.setState({ startDate: date });
        }
    }
    handleChangeName(e) {
        this.setState({ name: e.target.value });
    }
    handleChangeSurname(e) {
        this.setState({ surname: e.target.value });
    }

    render() {
        console.log(this.state);
        return (
            <div className='popup'>
                <div className='popup_inner'>

                    <form onSubmit={this.submitHandler}>
                        <FormGroup
                            controlId="formBasicText">

                            <ControlLabel>Your name</ControlLabel>
                            <FormControl
                                type="text"
                                value={this.state.name || ''}
                                placeholder="Enter name"
                                onChange={this.handleChangeName.bind(this)}
                            />

                            <ControlLabel>Your surname</ControlLabel>
                            <FormControl
                                type="text"
                                value={this.state.surname || ''}
                                placeholder="Enter surname"
                                onChange={this.handleChangeSurname.bind(this)}
                            />

                            <DatePicker
                                selected={this.state.startDate}
                                onChange={this.handleChangeDate}
                                showTimeSelect
                                timeFormat="HH:mm"
                                timeIntervals={15}
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

