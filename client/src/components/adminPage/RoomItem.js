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
            officeName: this.props.officeName,
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

    render() {
        const { id } = this.props;
        const { isFieldEditing, btnText } = this.state;
        return (
            <form onSubmit={(e)=> {this.changeRoomData(e,id)}}  style={{display:  'flex'}}>
                <FormControl  type="text" value={this.state.roomName} onChange={(e) => this.onRoomNameChange(e)} disabled={!isFieldEditing} required/>
                <FormControl  type="text" value={this.state.roomDescription} onChange={(e) => this.onRoomDescriptionChange(e)} disabled={!isFieldEditing} required/>
                <FormControl  type="text" value={this.props.officeName}  disabled />
                <Button type="submit" bsStyle={isFieldEditing? 'success': 'primary'} >{btnText}</Button>
                <Button type="button" bsStyle='danger' onClick={() => {
                    this.props.dispatch(deleteRoom(id));
                    this.setState({
                        isFieldEditing: false,
                        btnText: 'Edit'})
                    ;}}
                        style={!isFieldEditing ? {display: "none"} : {}}  aria-label="Delete">Delete
                </Button>
            </form>

        );
    }
}
function mapStateToProps ({user, rooms, offices}) {
    return {
        user,
        rooms,
        offices,
    }
}

export default connect(mapStateToProps)(RoomItem);