import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from "../../actions";
import RoomsInfo, { changeState } from "./RoomsInfo";
import io from 'socket.io-client';
import {getAllUsers, addEventToState , deleteEventFromState , editEventInState , getRooms , getCurrentUser, getEvents } from "../../actions";
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
        }

        this.infoHandler = this.infoHandler.bind(this);
        this.handleMouseEvent = this.handleMouseEvent.bind(this);



        //this.connect = this.connect.bind(this);
        this.socketAddRoom = this.socketAddRoom.bind(this);
        this.socketEditRoom = this.socketEditRoom.bind(this);
        this.socketDeleteRoom = this.socketDeleteRoom.bind(this);
    }

    componentWillMount(){
        this.props.dispatch(getRooms());
        this.props.dispatch(getCurrentUser());
        //this.props.dispatch(getAllUsers());
    };

    componentDidMount() {
        socket.on('add room', this.socketAddRoom);
        socket.on('edit room', this.socketEditRoom);
        socket.on('delete room', this.socketDeleteRoom);
        //socket.on('disconnect', this.disconnect);
        //socket.emit('connect user', this.connect());
    };


    // componentWillReceiveProps(){
    //     let { currentUser } = this.props.user;
    //     { currentUser &&  socket.emit('connect user', {currentUser})}
    // };


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
        })
        e.target.className = "info-button black";
        this.handleMouseEvent(props);
    }

    handleMouseEvent(props) {
        this.setState({
            mouseEvent: props
        })

        return this.state.mouseEvent
    }

    infoCloseWatcher() {
        if(this.state.activeButton && !this.state.mouseEvent) {
            let btn = this.state.activeButton;
            btn.className = "info-button";
        }
    }

    componentDidMount() {
        this.props.dispatch(getRooms());
        this.props.dispatch(getCurrentUser());
    }

    getDataTable(id){
        this.props.dispatch(getEvents(id));
    }

    renderMenu(){
        if(this.props.rooms) {
            return this.props.rooms.map( (index, key) => {
                return (
                    <li key={key}>
                        <Link to={`/room/`+ index.id} onClick={() => this.getDataTable(index.id)}>
                            {index.name}
                        </Link>
                        <div className="info-show">
                            <button className="info-button" onClick={(e) => this.infoHandler(e, index)}>i</button>
                        </div>
                    </li>
                );
            });
        }
        return (
            <li>Click me</li>
        )
    }



    render() {
        this.infoCloseWatcher();

        return(
            <aside>
                <nav>

                    <ul className="aside-menu">
                        <li>
                            <input type="checkbox" name ="sub-group-1" id="sub-group-1"/>
                            <label htmlFor="sub-group-1">Office 1</label>
                            <ul className="room-list">

                                {this.renderMenu()}

                                {this.state.mouseEvent ?  <RoomsInfo
                                        selectedRoom={this.state.mouseEvent}
                                        handleMouseEvent={this.handleMouseEvent}
                                    /> : []}
                            </ul>
                        </li>
                        <li>
                            <input type="checkbox" name ="sub-group-2" id="sub-group-2"/>
                            <label htmlFor="sub-group-2">Office 2</label>
                        </li>
                    </ul>
                </nav>
            </aside>



        );
    }
}

const mapStateToProps = ({ rooms,user}) => ({
    rooms,
    user
});

export default connect(mapStateToProps)(LeftNavBar);