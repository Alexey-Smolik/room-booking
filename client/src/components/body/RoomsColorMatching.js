import React, { Component } from 'react';

class RoomsColorMatching extends Component {

    render() {
        return (
            <div className='rooms-colors'>
                {this.props.rooms && this.props.rooms.map((room, index) => {
                    return <div >{room.name} <div style={{ backgroundColor: this.props.colors[index], height: '20px', width: '20px' }}></div> </div>
                })}
            </div>
        );
    }
}

export default RoomsColorMatching;
