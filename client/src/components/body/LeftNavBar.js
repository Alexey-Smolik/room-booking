import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCurrentUser, getRooms, getEvents } from '../../actions/index';
import {getAllUsers, addRoomToState, deleteRoomFromState, editRoomInState} from "../../actions";
import io from 'socket.io-client';
const socket = io('http://172.16.0.183:8000');

class LeftNavBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            infoVisible: false,
            description: '',
            issues: 'No Issues',
            image: {
                src: 'img.jpg',
                alt: '#',
            },
        };

        this.connect = this.connect.bind(this);
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
        socket.emit('connect user', this.connect());
    };


    // componentWillReceiveProps(){
    //     let { currentUser } = this.props.user;
    //     { currentUser &&  socket.emit('connect user', {currentUser})}
    // };


    socketAddRoom(server) {
        this.props.dispatch(addRoomToState(server));
    }

    socketEditRoom(server) {
        this.props.dispatch(editRoomInState(server));
    }

    socketDeleteRoom(server) {
        this.props.dispatch(deleteRoomFromState(server));
    }

    //
    // connect(server){
    //   console.log("Connect", server);
    //     let { currentUser } = this.props.user;
    //     { currentUser &&  socket.emit('connect user', {currentUser})}
    // }

    connect(server){
      console.log("Connect", server);
        let { currentUser } = this.props.user;
        { currentUser &&  socket.emit('connect user', {currentUser})}
    }



    infoHandler = (index) => {
        this.setState({
            id: index.id,
            description: index.description,
        });

        if (index.id === this.state.id || (this.state.id !== index.id && !this.state.infoVisible)) {
            this.setState({
                infoVisible: !this.state.infoVisible,
            });
        }
    }

    infoRender = () => {
        if (this.state.infoVisible && this.state.id) {
            return (
                <div className="room-info">
                    <div className="info-close" key="1" onClick={this.infoHandler(this.state.id)}>x</div>
                    <div className="room-image">
                        <img src={this.state.image.src} alt={this.state.image.alt} />
                    </div>
                    <div className="room-description">Description: {this.state.description}</div>
                    <div className="room-issues">Issues: {this.state.issues}</div>
                </div>
            );
        }
        return false;
    }

    renderMenu = () => {
        if (this.props.rooms) {
            return this.props.rooms.map((index, key) => (
                <li key={key}>
                    <Link to={`/room/${index.id}`} onClick={() => {this.props.dispatch(getEvents(index.id))}}>
                        {index.name}
                    </Link>
                    <div className="info-show">
                        <button className="info-button" onClick={() => this.infoHandler(index)}>i</button>
                    </div>
                </li>
            ));
        }
        return (
            <li>Click me</li>
        );
    }



    render() {
        return (
            <aside>
                <nav>

                    <ul className="aside-menu">
                        {this.renderMenu()}
                        {this.infoRender()}
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