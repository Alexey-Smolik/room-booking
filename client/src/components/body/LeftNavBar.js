import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCurrentUser, getRooms, getEvents } from '../../actions/index';
import io from 'socket.io-client';
import {getAllUsers} from "../../actions";
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


    this.test = this.test.bind(this);
  }

  componentWillMount(){
      this.props.dispatch(getRooms());
      this.props.dispatch(getCurrentUser());
      this.props.dispatch(getAllUsers());

      console.log("Current user1", this.props.user);

  };

  componentDidMount() {
      console.log("Current user2", this.props.user);
      socket.on('add room', this.test);
      socket.on('disconnect', this.disconnect);
  };


  componentWillReceiveProps(){
    let { user } = this.props;
    { user &&  socket.emit('connect user', {user})}
  };


  test(server){
      console.log("Test", server);
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
