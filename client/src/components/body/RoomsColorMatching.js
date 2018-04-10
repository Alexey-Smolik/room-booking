import React, { Component } from 'react';

class RoomsColorMatching extends Component {

    render() {
        return (
            <div className='rooms-colors'>
                {this.props.rooms && this.props.rooms.map((room, index) => {
                    return <div className="block_colors" key={room.id}>{room.name} <div className="color_pick" style={{ backgroundColor: this.props.colors[index] }}></div> </div>
                })}
            </div>
        );
    }
}

export default RoomsColorMatching;
