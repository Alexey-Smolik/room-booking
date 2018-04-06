import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import RoomsInfo, { changeState } from "./RoomsInfo";
import io from 'socket.io-client';
import {
    getAllEvents,
    getAllUsers,
    addEventToState ,
    deleteEventFromState ,
    editEventInState ,
    getRooms ,
    getCurrentUser,
    getEvents,
    getCompanies
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
        this.props.dispatch(getCompanies());
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

    componentDidMount() {
        this.props.dispatch(getRooms());
        this.props.dispatch(getCurrentUser());
    }

    getDataTable(id){
        this.props.dispatch(getEvents(id));
    }

    getAllEvents(e){
        e.preventDefault();
        this.props.dispatch(getAllEvents());
    }

    renderMenu(){
        if(this.props.companies) {
            return this.props.companies.map( (company, key) => {
                return (
                    // Companies List
                    <li key={key}>
                        <input type="checkbox" name={"sub-group-" + key} id={"sub-group-" + key}/>
                        <label htmlFor={"sub-group-" + key}>{company.name}</label>

                        {/*Rooms List*/}
                        <ul className="room-list">
                            {this.props.rooms.map( (room, roomKey) => {
                                return (room.companyId == company.id) ? (
                                    <li key={roomKey}>
                                        <Link to={'/room/'+ room.id} onClick={()=> this.getDataTable(room.id)}>
                                        {room.name}
                                        </Link>
                                        <div className="info-show">
                                            <button className="info-button" onClick={(e) => this.infoHandler(e, room)}>i</button>
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

        return(
            <aside>
                <nav>
                    <ul className="aside-menu">

                        {this.renderMenu()}
                        {this.state.mouseEvent ?  <RoomsInfo
                            selectedRoom={this.state.mouseEvent}
                            handleMouseEvent={this.handleMouseEvent}
                        /> : []}
                    </ul>
                </nav>
            </aside>



        );
    }
}

const mapStateToProps = ({ rooms, user, companies}) => ({
    rooms,
    user,
    companies
});

export default connect(mapStateToProps)(LeftNavBar);