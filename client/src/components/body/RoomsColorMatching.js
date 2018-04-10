import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from "../../actions";

class RoomsColorMatching extends Component {
    render() {
        console.log(this.props.colors);
        return (
            <div className='rooms-colors'>
                {this.props.rooms && this.props.colors && this.props.rooms.map((room, index) => {
                    return <div className="block_colors">{room.name} <div className= "color_pick" style={{ backgroundColor: this.props.colors[index] }}></div> </div>
                })}
            </div>
        );
    }
}

function mapStateToProps({ rooms }) {
    return {
        rooms
    };
}

export default connect(mapStateToProps)(RoomsColorMatching);
