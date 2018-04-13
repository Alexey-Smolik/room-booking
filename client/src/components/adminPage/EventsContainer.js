import React from 'react';
import { connect } from 'react-redux';
import { ControlLabel, FormControl } from 'react-bootstrap';
import EventItem from './EventItem'
import moment from 'moment';
import {
    getCurrentUser,
    getEvents,
} from '../../actions/index';

class EventsContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchValue: '',
        };
        this.props.dispatch(getCurrentUser());
    }

    onSearchChange (e) {
        this.setState({
            searchValue: e.target.value,
        });
        e.preventDefault();
    };
    componentWillMount () {
        this.props.dispatch(getEvents(this.props.roomID));

    }

    render() {
        let filteredEvents = this.props.events.filter((event) => {
            const startDate = new Date(event.date_from);
            const endDate = new Date(event.date_to);
            startDate.setTime(startDate.getTime() + startDate.getTimezoneOffset() * 60 * 1000);
            endDate.setTime(endDate.getTime() + endDate.getTimezoneOffset() * 60 * 1000);
            if(event.user) {
                return event.name.toLowerCase().includes(this.state.searchValue.toLowerCase()) ||
                    event.description.toLowerCase().includes(this.state.searchValue.toLowerCase()) ||
                    moment(startDate).format('LLL').toString().toLowerCase().includes(this.state.searchValue.toLowerCase()) ||
                    moment(endDate).format('LLL').toString().toLowerCase().includes(this.state.searchValue.toLowerCase()) ||
                    event.user.username.toLowerCase().includes(this.state.searchValue.toLowerCase())
            }
            else {
                return event.name.toLowerCase().includes(this.state.searchValue.toLowerCase()) ||
                    event.description.toLowerCase().includes(this.state.searchValue.toLowerCase()) ||
                    moment(startDate).format('LLL').toString().toLowerCase().includes(this.state.searchValue.toLowerCase()) ||
                    moment(endDate).format('LLL').toString().toLowerCase().includes(this.state.searchValue.toLowerCase()) ||
                    event.username.toLowerCase().includes(this.state.searchValue.toLowerCase())
            }
        });
        return (
            <div>
                <div>
                    { this.props.user.currentUser && this.props.user.currentUser.role === 1 ?
                        <div>
                            {!!this.props.events.length ?
                                <div  style={{display:  'flex'}}>
                                    <FormControl onChange={(e) => this.onSearchChange(e)} value={this.state.searchValue}  type="search" placeholder="Search event"/>
                                </div>
                                : <span>This room haven't any events. You can add event on Events Calendar</span>
                            }
                            <div>
                                {!!this.props.events.length && <div style={{display:  'flex', justifyContent: 'space-around'}}>
                                    <ControlLabel className="control-label" >Name</ControlLabel>
                                    <ControlLabel className="control-label" >Description</ControlLabel>
                                    <ControlLabel className="control-label" >Date from</ControlLabel>
                                    <ControlLabel className="control-label" >Date to</ControlLabel>
                                    <ControlLabel className="control-label" >Username</ControlLabel>
                                </div>}
                                {filteredEvents.map((event) => {
                                    const startDate = new Date(event.date_from);
                                    const endDate = new Date(event.date_to);
                                    startDate.setTime(startDate.getTime() + startDate.getTimezoneOffset() * 60 * 1000);
                                    endDate.setTime(endDate.getTime() + endDate.getTimezoneOffset() * 60 * 1000);
                                    if(event.user) {
                                        return <EventItem
                                            name={event.name}
                                            description={event.description}
                                            dateFrom={moment(startDate).format('LLL')}
                                            dateTo={moment(endDate).format('LLL')}
                                            username={event.user.username}
                                            roomId={event.roomId}
                                            userId={event.userId}
                                            id={event.id}
                                            key={event.id}
                                        />
                                    } else {
                                        return <EventItem
                                            name={event.name}
                                            description={event.description}
                                            dateFrom={moment(startDate).format('LLL')}
                                            dateTo={moment(endDate).format('LLL')}
                                            username={event.username}
                                            roomId={event.roomId}
                                            userId={event.userId}
                                            id={event.id}
                                            key={event.id}
                                        />
                                    }
                                }) }
                            </div>
                        </div>
                        : <div>
                            <h3>Your haven't permission to view this page</h3>
                        </div>
                    }
                </div>
            </div>
        );
    }
}
function mapStateToProps ({user, events}) {
    return {
        user,
        events
    }
}

export default connect(mapStateToProps)(EventsContainer);