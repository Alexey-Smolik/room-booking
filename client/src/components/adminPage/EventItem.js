import React from 'react';
import { Button, FormControl } from 'react-bootstrap';
import { connect } from 'react-redux';
import {
    deleteEvent,
    editEvent,
} from '../../actions/index'

class EventItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            eventName: this.props.name,
            eventDescription: this.props.description,
            isFieldEditing: false,
            btnText: 'Edit',
        };
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            eventName: nextProps.name,
            eventDescription: nextProps.description,
        });
    }
    changeEventData = (e,id) => {
        this.setState({
            btnText: 'Cancel',
            isFieldEditing: true,
        });
        let start = new Date(this.props.dateFrom),
            end = new Date(this.props.dateTo);
        start.setTime(start.getTime() - start.getTimezoneOffset() * 60 * 1000);
        end.setTime(end.getTime() - end.getTimezoneOffset() * 60 * 1000);
        const eventData = {
            id: id,
            name: this.state.eventName,
            description: this.state.eventDescription,
            date_from: start,
            date_to: end,
            roomId: this.props.roomId,
            userId: this.props.userId,
            username: this.props.username
        };
        if(this.state.btnText === 'Save') {
            this.props.dispatch(editEvent(id, eventData));
            this.setState({
                btnText: 'Edit',
                isFieldEditing: false,
            });
        } else if(this.state.btnText === 'Cancel') {
            this.setState({
                btnText: 'Edit',
                isFieldEditing: false,
            });
        }

        e.preventDefault()
    };
    onEventNameChange (e) {
        this.setState({
            eventName: e.target.value,
            btnText: 'Save',
        });
        e.preventDefault();
    };
    onEventDescriptionChange (e) {
        this.setState({
            eventDescription: e.target.value,
            btnText: 'Save',
        });
        e.preventDefault();
    };

    render() {
        const { id, dateFrom, dateTo, username } = this.props;
        const { isFieldEditing, btnText } = this.state;
        return (
            <div style={{display:  'flex', paddingBottom: '15px'}}>
                <FormControl  type="text" value={this.state.eventName} onChange={(e) => this.onEventNameChange(e)} disabled={!isFieldEditing} />
                <FormControl  type="text" value={this.state.eventDescription} onChange={(e) => this.onEventDescriptionChange(e)} disabled={!isFieldEditing} />
                <FormControl  type="text" value={dateFrom} disabled />
                <FormControl  type="text" value={dateTo} disabled/>
                <FormControl  type="text" value={username}  disabled />
                <Button type="submit" bsStyle={isFieldEditing? 'success': 'primary'} onClick={(e)=> {this.changeEventData(e,id)}}>{btnText}</Button>
                <Button type="button" bsStyle='danger' onClick={() => {
                    this.props.dispatch(deleteEvent(id));
                    this.setState({
                        isFieldEditing: false,
                        btnText: 'Edit'})
                    ;}}
                        style={!isFieldEditing ? {display: "none"} : {}}  aria-label="Delete">
                    <span aria-hidden="true">&times;</span>
                </Button>
            </div>

        );
    }
}


export default connect()(EventItem);