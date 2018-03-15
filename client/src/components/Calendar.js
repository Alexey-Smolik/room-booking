import React from 'react'
import BigCalendar from 'react-big-calendar'
import moment from 'moment';
import * as actions from '../actions';
import {connect} from 'react-redux';

import Popup from './Popup';
import 'react-big-calendar/lib/css/react-big-calendar.css';
BigCalendar.momentLocalizer(moment); // or globalizeLocalizer

class Calendar extends  React.Component  {
    constructor(props){
        super(props);
        this.state = {
            showPopup:false,
            editMode: false
        };
        this.submitHandler = this.submitHandler.bind(this);
        this.togglePopup = this.togglePopup.bind(this);
    }


    submitHandler(event){
        this.setState({
            showPopup: !this.state.showPopup,
            event: event
        });
    }

    togglePopup() {
        this.setState({
            showPopup: !this.state.showPopup,
            event: ''
        });
    }

    render() {
        let events = [];
        if(this.props.room){
            events = this.props.room.events.map((event => {
                return {
                    id: event.id,
                    desc: event.description,
                    title: event.name,
                    start: new Date(event.date_from),
                    end: new Date(event.date_to)
                }
            }))
        }
        return(
            <div>
                <React.Fragment>
                    <BigCalendar
                        selectable
                        events={events}
                        defaultView="week"
                        scrollToTime={new Date(1970, 1, 1, 6)}
                        defaultDate={new Date(2018, 2, 1)}
                        onSelectEvent={(event) => console.log(event)}
                        onSelectSlot={(event) => console.log(event)}
                    />
                </React.Fragment>

                {this.state.showPopup ?
                    <Popup
                        event={this.state.event}
                        id={this.props.id}
                        user={this.state.user}
                        addNote={this.addHandler}
                        editNote={this.props.editNote}
                        close={this.togglePopup}
                        editMode={this.state.editMode}
                    /> : null}
            </div>
        )
    }
}

function mapStateToProps({ events }) {
    return {
        room: events
    };
}

export default connect(mapStateToProps,actions)(Calendar);