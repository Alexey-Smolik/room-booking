import React from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import { Link } from 'react-router-dom';
import 'moment/locale/en-gb';
import {
    getEvents,
    addEventToState,
    deleteEventFromState,
    editEventInState,
    getAllEvents,
    simpleUsers,
    getEventsByInvitationUser,
} from '../../actions';
import { connect } from 'react-redux';
import Popup from './Popup';
import RoomsColorMatching from './RoomsColorMatching';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import randomColor from 'randomcolor';
import io from 'socket.io-client';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
const socket = io('http://172.16.0.183:8000');

BigCalendar.momentLocalizer(moment);



class Calendar extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            showPopup: false,
            editMode: false,
            event: '',
        };
        this.socketAddEvent = this.socketAddEvent.bind(this);
        this.socketEditEvent = this.socketEditEvent.bind(this);
        this.socketDeleteEvent = this.socketDeleteEvent.bind(this);
    }

    componentWillMount() {
        this.setState({
            colors : randomColor({ count: this.props.rooms.length, luminosity: 'light', format: 'rgba', alpha: 0.75 })
        });
        if(!this.props.roomID) {
            if(this.props.match.params.roomID !== 'all') {
                if(Object.keys(this.props.mode).length === 0 && this.props.mode.constructor === Object)  this.props.dispatch(getEvents(this.props.match.params.roomID));
            } else {
                this.props.dispatch(getAllEvents());
            }
        }
    };
    componentDidMount(){
        this.props.dispatch(simpleUsers());
        socket.on('add event', this.socketAddEvent);
        socket.on('edit event', this.socketEditEvent);
        socket.on('delete event', this.socketDeleteEvent);
        socket.on('disconnect', this.disconnect);
    };

    componentWillUpdate(nextProps, nextState) {
        if(this.props.rooms.length) {
            if(this.props.roomID ? (this.props.roomID !== nextProps.roomID) : (this.props.match.params.roomID !== nextProps.match.params.roomID)) {
                this.setState({
                    colors : nextState.colors
                })
            }
        } else if (nextProps.rooms.length) {
            this.setState({
                colors : randomColor({ count:nextProps.rooms.length , luminosity: 'light', format: 'rgba', alpha: 0.75 })
            });
        }
    }

    socketAddEvent(event) {
        let roomID = this.props.roomID  || this.props.match.params.roomID;
        console.log("Test1", event );
        this.props.dispatch(addEventToState(event, roomID));
    };

    socketEditEvent(event) {
        let roomID = this.props.roomID  || this.props.match.params.roomID;
        console.log("Test2", event);
        this.props.dispatch(editEventInState(event,roomID));
    };

    socketDeleteEvent(eventID) {
        console.log("Test3", eventID);
        this.props.dispatch(deleteEventFromState(eventID));
    };


    dateFilter = (event, eventID = -1) => {
        const eventsArray = this.props.events;

        for (let i = 0; i < eventsArray.length; i++) {
            const start = new Date(eventsArray[i].date_from);
            const end = new Date(eventsArray[i].date_to);
            start.setTime(start.getTime() + start.getTimezoneOffset() * 60 * 1000);
            end.setTime(end.getTime() + end.getTimezoneOffset() * 60 * 1000);

            if (this.state.editMode) {
                if((eventID > -1 && eventID !== eventsArray[i].id) &&
                    ((((event.start < start)  && (event.end < end)  &&  (event.end > start))  ||
                        ((event.start >= start)  && (event.end <= end)))  ||
                        ((event.start <= start)  && (event.end >= end))   ||
                        ((event.start > start)  && (event.end > end)  &&   (event.start < end)))) {
                    return false;
                }
            } else if( (((event.start < start)  && (event.end < end)  &&  (event.end > start))  ||
                    ((event.start >= start)  && (event.end <= end)))  ||
                ((event.start <= start)  && (event.end >= end))   ||
                ((event.start > start)  && (event.end > end)  &&   (event.start < end))    ) {
                return false;
            }
        }
        return true;
    };

    editEvent = (event) => {
        this.setState( (prevState) => ({
            showPopup: !prevState.showPopup,
            event,
            editMode: true
        }))
    };

    addEvent = (event) => {
        let {role} = this.props.user.currentUser;
        if(role === 1 || role === 2) {
            if (this.dateFilter(event)) {
                this.setState((prevState) => ({
                    showPopup: !prevState.showPopup,
                    addingEvent: true,
                    event,
                }))
            } else {
                (this.createNotification('date')());
            }
        } else {
            (this.createNotification('role')());
        }
    };

    closePopup = () => {
        this.setState((prevState) => ({
            showPopup: !prevState.showPopup,
            event: '',
            editMode: false,
        }))
    };

    createNotification = (type) => {
        return () => {
            switch (type) {
                case 'role':
                    NotificationManager.error('You do not have the rights!', 'Role', 3000);
                    break;
                case 'date':
                    NotificationManager.error('There is event on this date!', 'Date', 3000);
                    break;
                case 'all events':
                    NotificationManager.error('You can not add event while "all events" is open', 'Events', 3000);
                    break;
            }
        };
    };

    render() {
        let events = [];
        let rooms = this.props.rooms.map(({id}) => id);

        { this.props.events &&  (events = this.props.events.map((event) => {
            const start = new Date(event.date_from);
            const end = new Date(event.date_to);
            start.setTime(start.getTime() + start.getTimezoneOffset() * 60 * 1000);
            end.setTime(end.getTime() + end.getTimezoneOffset() * 60 * 1000);

            return {
                id: event.id,
                roomId: event.roomId,
                description: event.description,
                title: event.name,
                start, end,
                user: event.user ? event.user.username : event.username,
                userId: event.userId,
                invitations: event.invitations
            };
        }));
        }

        return (
            <div className= {this.props.roomID ? "" : "calendar-cont"}>
                {this.props.user && this.props.user.currentUser ?
                    <React.Fragment>
                        <BigCalendar
                            selectable
                            events={events}
                            defaultView="week"
                            min={moment('2018-02-23 08:00:00').toDate()}
                            max={moment('2018-02-23 19:00:00').toDate()}
                            scrollToTime={new Date(1970, 1, 1, 6)}
                            defaultDate={new Date()}
                            culture="en-GB"
                            onSelectEvent={event => this.editEvent(event)}
                            onSelectSlot={event => {
                                ((this.props.roomID && this.props.roomID === 'all') || (!this.props.roomID && this.props.match.params.roomID === 'all')) ?
                                    this.createNotification('all events')()
                                    : this.addEvent(event);
                            }}
                            eventPropGetter={(event) => {
                                return {
                                    style: {
                                        backgroundColor: this.state.colors[rooms.indexOf(event.roomId)],
                                        color: 'black'
                                    }
                                };
                            }
                            }
                        />
                    </React.Fragment> :
                    (this.props.user.isLoaded || this.props.user.hasError) && <h1>
                        <p style={{ color: '#B71C1C', fontSize: '50px' }}>Sorry, no access<br/>Authorize please</p>
                        <Link className="link_404_1" to={'/'}  style={{ fontWeight: 'normal' }}>Sign in</Link>
                    </h1>}
                    {this.state.showPopup && <Popup
                        event={this.state.event}
                        user={this.props.user}
                        closePopup={this.closePopup}
                        editMode={this.state.editMode}
                        roomID={this.props.roomID || this.props.match.params.roomID}
                        dateFilter={this.dateFilter}/>}
                {(!this.props.roomID && this.props.match.params.roomID === 'all') &&
                    <RoomsColorMatching colors={this.state.colors} rooms={this.props.rooms}/>
                }
            </div>
        );
    }
}

Calendar.defaultProps = {
    user: {
        role: 2
    }
};


let mapStateToProps = ({ events, user, rooms, mode }) => {
    return {
        rooms,
        user,
        events,
        mode
    };
};

export default connect(mapStateToProps)(Calendar);