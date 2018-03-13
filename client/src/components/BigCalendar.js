import React from 'react'
import BigCalendar from 'react-big-calendar'
import events from './events';
import moment from 'moment';
import * as actions from '../actions';
import {connect} from 'react-redux';


import 'react-big-calendar/lib/css/react-big-calendar.css';
BigCalendar.momentLocalizer(moment); // or globalizeLocalizer


let BigCalendar = () => (
    <React.Fragment>
        <BigCalendar
            selectable
            events={events}
            defaultView="week"
            scrollToTime={new Date(1970, 1, 1, 6)}
            defaultDate={new Date(2015, 3, 12)}
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
  )
  
  function mapStateToProps({ events , user }) {
    return {
        room: events,
        user: user
    };
}

export default connect(mapStateToProps,actions)(BigCalendar);



  