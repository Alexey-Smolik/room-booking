import React from 'react';
import { Button, FormControl } from 'react-bootstrap';
import { connect } from 'react-redux';
import {
    updateRoom,
    deleteRoom,

} from '../../actions/index'

class RoomItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            btnText: 'Edit',
            roomName: this.props.name,
            roomFloor: this.props.floor,
            roomDescription: this.props.description,
            isFieldEditing: false,
        };
    }

    changeRoomData = (e,id) => {
        this.setState({
            btnText: 'Cancel',
            isFieldEditing: true,
        });
        const roomData = {
            id: id,
            name: this.state.roomName,
            description: this.state.roomDescription,
            floor: this.state.roomFloor,
            companyName: this.props.companyName,
        };
        if(this.state.btnText === 'Save') {
            this.props.dispatch(updateRoom(roomData,id));
            this.setState({
                btnText: 'Edit',
                isFieldEditing: false,
            });
        } else if(this.state.btnText === 'Cancel') {
            this.setState({
                btnText: 'Edit',
                isFieldEditing: false,
            });
        }
        e.preventDefault()
    };
    onRoomNameChange (e) {
        this.setState({
            roomName: e.target.value,
            btnText: 'Save'
        });
        e.preventDefault();
    };
    onRoomDescriptionChange (e) {
        this.setState({
            roomDescription: e.target.value,
            btnText: 'Save'
        });
        e.preventDefault();
    };
    onRoomFloorChange (e) {
        this.setState({
            roomFloor: e.target.value,
            btnText: 'Save'
        });
        e.preventDefault();
    };

    render() {
        const { id } = this.props;
        const { isFieldEditing, btnText } = this.state;
        return (
            <div style={{display:  'flex', paddingBottom: '15px'}}>
                <FormControl  type="text" value={this.state.roomName} onChange={(e) => this.onRoomNameChange(e)} disabled={!isFieldEditing}/>
                <FormControl  type="text" value={this.state.roomDescription} onChange={(e) => this.onRoomDescriptionChange(e)} disabled={!isFieldEditing}/>
                <FormControl  type="number" value={this.state.roomFloor} onChange={(e) => this.onRoomFloorChange(e)} disabled={!isFieldEditing}/>
                <FormControl  type="text" value={this.props.companyName}  disabled />
                <Button type="submit" bsStyle={isFieldEditing? 'success': 'primary'} onClick={(e)=> {this.changeRoomData(e,id)}} >{btnText}</Button>
                <Button type="button" bsStyle='danger' onClick={() => {
                    this.props.dispatch(deleteRoom(id));
                    this.setState({
                        isFieldEditing: false,
                        btnText: 'Edit'})
                    ;}}
                        style={!isFieldEditing ? {display: "none"} : {}}  aria-label="Delete">
                    <span aria-hidden="true">&times;</span>
                </Button>
            </div>

        );
    }
}
function mapStateToProps ({user, rooms, companies}) {
    return {
        user,
        rooms,
        companies,
    }
}

export default connect(mapStateToProps)(RoomItem);