import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from "../actions";
import RoomsInfo, { changeState } from "./RoomsInfo";


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
    }

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
        this.props.getRooms();
        this.props.getCurrentUser();
    }

    getDataTable(id){
        this.props.getEvents(id);
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
                        {this.renderMenu()}
                        {this.state.mouseEvent ?
                            <RoomsInfo
                                selectedRoom={this.state.mouseEvent}
                                handleMouseEvent={this.handleMouseEvent}
                            /> : []}
                    </ul>
                </nav>
            </aside>
        );
    }
}

function mapStateToProps({ rooms }) {
    return {
        rooms: rooms,
    };
}

export default connect(mapStateToProps, actions)(LeftNavBar);