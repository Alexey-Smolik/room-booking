import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from "../../actions";

class RoomsColorMatching extends Component {
    render() {
        console.log(this.props.colors);
        return (
            <div className='rooms-colors'>
                {this.props.rooms && this.props.colors && this.props.rooms.map((room, index) => {
                    return <div>{room.name} <div style={{ backgroundColor: this.props.colors[index], height: '20px', width: '20px' }}></div> </div>
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