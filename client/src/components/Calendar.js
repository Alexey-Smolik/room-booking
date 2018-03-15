import React from 'react'
import BigCalendar from 'react-big-calendar'
import moment from 'moment';
import 'moment/locale/en-gb';
import * as actions from '../actions';
import {connect} from 'react-redux';
import Popup from './Popup';
import 'react-big-calendar/lib/css/react-big-calendar.css';

BigCalendar.momentLocalizer(moment);

class Calendar extends  React.Component  {
    constructor(props){
        super(props);
        this.state = {
            showPopup:false,
            editMode: false
        };
        this.submitHandler = this.onSelectHandler.bind(this);
        this.togglePopup = this.togglePopup.bind(this);
    }

    onSelectHandler(event){
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
                        min={moment('2018-02-23 08:00:00').toDate()}
                        max={moment('2018-02-23 19:00:00').toDate()}
                        scrollToTime={new Date(1970, 1, 1, 6)}
                        defaultDate={new Date(2018, 2, 1)}
                        culture={"en-GB"}
                        onSelectEvent={(event) => this.onSelectHandler(event)}
                        onSelectSlot={slot => this.onSelectHandler(slot)}
                    />
                </React.Fragment>

                {this.state.showPopup ?
                    <Popup
                        event={this.state.event}
                        user={this.props.user}
                        addNote={this.addHandler}
                        close={this.togglePopup}
                        editMode={this.state.editMode}
                        room={this.props.room}
                    /> : null}
            </div>
        )
    }
}

function mapStateToProps({ events, user }) {
    return {
        room: events,
        user: user
    };
}

export default connect(mapStateToProps,actions)(Calendar);