import React , { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from "../actions";


class LeftNavBar extends Component {


    componentDidMount() {
        this.props.getRooms();

    }

    getDataTable(id){
        this.props.getEvents(id);
        console.log("LeftNavBar - getevetns",id);
        this.props.rooms;
    }


    renderMenu(){
        if(this.props.rooms != null) {
            return this.props.rooms.map( index => {
                return (
                    <li onClick={() => this.getDataTable(index.id)}>
                        {index.name}
                    </li>);
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

export default connect(null , actions)(LeftNavBar);


