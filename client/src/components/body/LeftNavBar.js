import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import RoomsInfo, { changeState } from "./RoomsInfo";
import io from 'socket.io-client';
import Footer from '../Footer/Footer';


import {
    getAllEvents,
    getRoomActiveIssues,
    addEventToState,
    deleteEventFromState,
    editEventInState,
    getRooms,
    getCurrentUser,
    getEvents,
    getOffices,
    getEventsByInvitationUser,
} from "../../actions";
const socket = io('http://172.16.0.183:8000');


class LeftNavBar extends Component {

// Getting rooms from redux state.
// Pushing props(active button) from onclick-event in room-info.
// handleMouseEvent uses in RoomsInfo

    constructor(props) {
        super(props);
        this.state = {
            activeButton: '',
            mouseEvent: ''
        };

        this.infoHandler = this.infoHandler.bind(this);
        this.handleMouseEvent = this.handleMouseEvent.bind(this);

        this.connect = this.connect.bind(this);
        this.socketAddRoom = this.socketAddRoom.bind(this);
        this.socketEditRoom = this.socketEditRoom.bind(this);
        this.socketDeleteRoom = this.socketDeleteRoom.bind(this);
    }

    async componentDidMount() {
        this.props.dispatch(getRooms());
        this.props.dispatch(getOffices());
        await this.props.dispatch(getCurrentUser());
        socket.on('add room', this.socketAddRoom);
        socket.on('edit room', this.socketEditRoom);
        socket.on('delete room', this.socketDeleteRoom);
        socket.on('disconnect', this.disconnect);
        await socket.emit('connect user', this.props.user.currentUser);
    };

    connect(){
        let { currentUser } = this.props.user;
        { currentUser &&  socket.emit('connect user', {currentUser})}
    }

    socketAddRoom(server) {
        this.props.dispatch(addEventToState(server));

    }

    socketEditRoom(server) {
        this.props.dispatch(editEventInState(server));
    }

    socketDeleteRoom(server) {
        this.props.dispatch(deleteEventFromState(server));
    }

    //
    // connect(server){
    //   console.log("Connect", server);
    //     let { currentUser } = this.props.user;
    //     { currentUser &&  socket.emit('connect user', {currentUser})}
    // }

    infoHandler(e, props) {
        if(this.state.mouseEvent) {
            let btn = this.state.activeButton;
            btn.className = 'info-button';
            if(this.state.mouseEvent.id === props.id) {
                this.handleMouseEvent('');
                e.target.className = "info-button";
                return;
            }
        }
        this.setState({
            activeButton: e.target
        });
        e.target.className = "info-button black";
        this.handleMouseEvent(props);
    }

    handleMouseEvent(props) {
        this.setState({
            mouseEvent: props
        });

        return this.state.mouseEvent
    }

    infoCloseWatcher() {
        if(this.state.activeButton && !this.state.mouseEvent) {
            let btn = this.state.activeButton;
            btn.className = "info-button";
        }
    }

    getDataTable(id) {
        let {mode} = this.props.mode;
        mode === undefined ?
            this.props.dispatch(getEvents(id))
            :
            this.props.dispatch(getEventsByInvitationUser(id, this.props.user.currentUser.id))
    }

    renderMenu(){
        if(this.props.offices) {
            return this.props.offices.map( (office, key) => {
                return (

                    // Officess List
                    <li key={key}>

                        <input type="checkbox"  name={"sub-group-" + key} id={"sub-group-" + key} defaultChecked/>
                        <label htmlFor={"sub-group-" + key}>{office.name}</label>

                        {/*Rooms List*/}
                        <ul className="room-list">
                            {this.props.rooms.map( (room, roomKey) => {
                                    return (room.officeId === office.id) ? (
                                            <li key={roomKey}>

                                                <NavLink activeStyle={{ color:'#B71C1C', fontWeight: 'bold' }} to={'/room/'+ room.id} onClick={()=> this.getDataTable(room.id)}>
                                                    {room.name}
                                                </NavLink>

                                                <div className="info-show">
                                                    <button className="info-button" title="Info about room" onClick={(e) => {
                                                        this.infoHandler(e, room);
                                                        this.props.dispatch(getRoomActiveIssues(room.id))}}
                                                    >i</button>

                                                </div>
                                            </li>)
                                        : null;
                                }
                            )}
                        </ul>
                    </li>
                );
            });
        }
        return (<li>Click me</li>);
    }


    render() {
        this.infoCloseWatcher();

        return (
            <aside>
                {!this.props.user.hasError ?
                    <aside>
                        <nav>
                            <ul className="aside-menu" >
                                {this.props.user && this.props.user.currentUser && this.props.user.currentUser.role === 1 && <Link  className="all_events" style={{ borderBottom: '1px solid #e7e7e7' }} to='/adminPanel'>Admin panel</Link>}
                                <NavLink activeStyle={{ color:'#B71C1C' }} className="all_events" to={'/room/all'} onClick={() =>  this.props.dispatch(getAllEvents(this.props.mode.mode ? this.props.user.currentUser.id : null))}>
                                    Show all events
                                </NavLink>
                                {this.renderMenu()}
                                {this.state.mouseEvent ?  <RoomsInfo
                                    userRole = {this.props.user.currentUser.role}
                                    selectedRoom={this.state.mouseEvent}
                                    handleMouseEvent={this.handleMouseEvent}
                                    issues = {this.props.issues}
                                /> : []}
                            </ul>
                        </nav>
                        <Footer />
                    </aside>
                    : null}
            </aside>
        );
    }
}

const mapStateToProps = ({ rooms, user, offices, issues, mode}) => ({
    rooms,
    user,
    offices,
    issues,
    mode
});

export default connect(mapStateToProps)(LeftNavBar);
