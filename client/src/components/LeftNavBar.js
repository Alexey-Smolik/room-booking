import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// import * as actions from "../actions";
import { getCurrentUser, getRooms, getEvents } from '../actions';


class LeftNavBar extends Component {
// Rendering room-info window from props that takes from onclick-event.

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
  }

  componentDidMount() {
    this.props.dispatch(getRooms());
    this.props.dispatch(getCurrentUser());
  }


  infoHandler = (index) => {
    this.setState({
      id: index.id,
      description: index.description,
    });

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
        this.props.getRooms();
        this.props.getCurrentUser();
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

const mapStateToProps = ({ rooms }) => ({
  rooms,
});

export default connect(mapStateToProps)(LeftNavBar);
