import React from 'react'
import BigCalendar from 'react-big-calendar'
import events from './events';
import moment from 'moment';
import * as actions from '../actions';
import {connect} from 'react-redux';


import 'react-big-calendar/lib/css/react-big-calendar.css';
BigCalendar.momentLocalizer(moment); // or globalizeLocalizer

let Calendar = (props) => {
    let events = [];
    if(props.room){
        events = props.room.events.map((event => {
            return {
                id: event.id,
                desc: event.description,
                title: event.name,
                start: new Date(event.date_from),
                end: new Date(event.date_to)
            }
        }));
    }

    return (
        <React.Fragment>
            <BigCalendar
                selectable
                events={events}
                defaultView="week"
                scrollToTime={new Date(1970, 1, 1, 6)}
                defaultDate={new Date(2018, 2, 1)}
                onSelectEvent={event => alert(event.title)}
                onSelectSlot={slotInfo =>
                    alert(
                        `selected slot: \n\nstart ${slotInfo.start.toLocaleString()} ` +
                        `\nend: ${slotInfo.end.toLocaleString()}` +
                        `\naction: ${slotInfo.action}`
                    )
                }
            />
        </React.Fragment>
    );
};
  
function mapStateToProps({ events }) {
    return {
        room: events
    };
}

export default connect(mapStateToProps,actions)(Calendar);


  