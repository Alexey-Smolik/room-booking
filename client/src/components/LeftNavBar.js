import React , { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from "../actions";


class LeftNavBar extends Component {
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
                    <li key={key}><Link to={`/room/`+ index.id} onClick={() => this.getDataTable(index.id)}>
                        {index.name}
                    </Link></li>);
            });
        }
        return (
            <li>Click me</li>
        )
    }

    render() {
        return(
            <aside>
                <nav>
                    <ul className="aside-menu">
                        {this.renderMenu()}
                    </ul>
                </nav>
            </aside>
        );
    }
}

function mapStateToProps({ rooms }) {
    return {
        rooms: rooms
    };
}

export default connect(mapStateToProps,actions)(LeftNavBar);
