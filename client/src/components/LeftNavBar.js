import React , { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from "../actions";
import RoomsInfo from "./RoomsInfo";


class LeftNavBar extends Component {

// Pushing props from onclick-event in room-info.   

    constructor(props) {
        super(props);
        this.state = {
            activeButton: ''
        }

        this.infoHandler = this.infoHandler.bind(this);
    }

    infoHandler(e, props) {
        if(this.props.mouseEvents) {
            let btn = this.state.activeButton;
                btn.className = 'info-button';
            if(this.props.mouseEvents.id === props.id) {
                this.props.handleMouseEvent('');
                e.target.className = "info-button";
                return;
            } 
        }
        this.setState({
            activeButton: e.target
        })
        e.target.className = "info-button black";
        this.props.handleMouseEvent(props);
    }

    infoCloseWatcher() {
        if(this.state.activeButton && !this.props.mouseEvents) {
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
                        {this.props.mouseEvents ? 
                            <RoomsInfo 
                                mouseEvents={this.props.mouseEvents} 
                                handleMouseEvent={this.props.handleMouseEvent}
                            /> : []}
                    </ul>
                </nav>
            </aside>
        );
    } 
}

function mapStateToProps({ rooms, mouseEvents }) {
    return {
        rooms: rooms,
        mouseEvents: mouseEvents
    };
}

export default connect(mapStateToProps, actions)(LeftNavBar);
