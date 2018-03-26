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
            editMode: false,
            event: ''
        };
        this.closePopup = this.closePopup.bind(this);
        this.dateFilter = this.dateFilter.bind(this);
        this.addEvent = this.addEvent.bind(this);
        this.editEvent = this.editEvent.bind(this);
    }

    componentWillMount(){
        this.props.getEvents(this.props.match.params.roomID);
        console.log("Update events");
    }

    dateFilter(event, eventID = -1) {
        let eventsArray = this.props.room.events;

        for (let i = 0; i < eventsArray.length; i++) {
            let start = new Date(eventsArray[i].date_from);
            let end = new Date(eventsArray[i].date_to);
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
            } else {
                if( (((event.start <= start)  && (event.end <= end)  &&  (event.end >= start))  ||
                        ((event.start >= start)  && (event.end <= end)))  ||
                    ((event.start <= start)  && (event.end >= end))   ||
                    ((event.start >= start)  && (event.end >= end)  &&   (event.start <= end))    ) {
                    return false;
                }
            }
        }
        return !this.state.editMode;
    }

    editEvent(event){
        this.setState({
            showPopup: !this.state.showPopup,
            event: event,
            editMode: true
        });
    }

    addEvent(event) {
        if( this.dateFilter(event) ) {
            this.setState({
                showPopup: !this.state.showPopup,
                event: event
            });
        } else {
            alert("There is event on your date");
        }
    }

    closePopup() {
        this.setState({
            showPopup: !this.state.showPopup,
            event: '',
            editMode: false
        });
    }

    render() {

        let events = [];
        console.log(this.props.match.params);
        if(this.props.room){
            {this.props.room.events && (events = this.props.room.events.map( event => {
                let start = new Date(event.date_from);
                let end = new Date(event.date_to);
                start.setTime(start.getTime() + start.getTimezoneOffset()*60*1000 );
                end.setTime(end.getTime() + end.getTimezoneOffset()*60*1000 );

                return {
                    id: event.id,
                    desc: event.description,
                    title: event.name,
                    start: start,
                    end: end
                }
            }))}
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
                        onSelectEvent={ (event) => this.editEvent(event) }
                        onSelectSlot={ (event) => this.addEvent(event)}
                    />
                </React.Fragment>

                {this.state.showPopup ?
                    <Popup
                        event={this.state.event}
                        user={this.props.user}
                        closePopup={this.closePopup}
                        editMode={this.state.editMode}
                        room={this.props.room}
                        dateFilter={this.dateFilter}
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