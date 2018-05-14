import React from 'react';
import { connect } from 'react-redux';
import { Button, ControlLabel, FormControl,Jumbotron } from 'react-bootstrap';
import RoomItem from './RoomItem'
import {
    createRoom,
    getRooms,
    getOffices,
} from '../../actions/index';

class RoomsContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            roomName: '',
            roomFloor: '',
            roomDescription: '',
            roomOfficeName: '',
            addFieldIsVisible: false,
            searchValue: '',
        };
        this.props.dispatch(getRooms());
        this.props.dispatch(getOffices());
    }
    addRoom(e) {
        let officeId = null;
        let officeName = '';
        this.props.offices.forEach((office) => {
            if(office.name === this.state.roomOfficeName ) {
                officeId = office.id;
                officeName = office.name;
            }
        });
        const roomData = {
            name: this.state.roomName,
            description: this.state.roomDescription,
            floor: this.state.roomFloor,
            officeId: officeId,
            officeName: officeName
        };
        this.props.dispatch(createRoom(roomData));
        this.toggleAddRoomField();
        e.preventDefault()
    }
    toggleAddRoomField() {
        this.setState({
            addFieldIsVisible : !this.state.addFieldIsVisible,
            searchValue: '',
            roomName: '',
            roomFloor: '',
            roomDescription: '',
            roomOfficeName: '',
        })
    }
    onRoomNameChange (e) {
        this.setState({
            roomName: e.target.value,
        });
        e.preventDefault();
    };
    onRoomDescriptionChange (e) {
        this.setState({
            roomDescription: e.target.value,
        });
        e.preventDefault();
    };
    onRoomFloorChange (e) {
        this.setState({
            roomFloor: e.target.value,
        });
        e.preventDefault();
    };

    onSearchChange (e) {
        this.setState({
            searchValue: e.target.value,
        });
        e.preventDefault();
    };
    onSelectChange (e) {
        this.setState({
            roomOfficeName: e.target.value,
        });
        e.preventDefault();
    };
    render() {

        let filteredRooms = this.props.rooms.filter((room) => {
            if(room.office) {
                return room.name.toLowerCase().includes(this.state.searchValue.toLowerCase()) ||
                    room.description.toLowerCase().includes(this.state.searchValue.toLowerCase()) ||
                    room.name.toLowerCase().includes(this.state.searchValue.toLowerCase()) ||
                    room.office.name.toLowerCase().includes(this.state.searchValue.toLowerCase()) ||
                    room.floor.toString().includes(this.state.searchValue)
            } else {
                return room.name.toLowerCase().includes(this.state.searchValue.toLowerCase()) ||
                    room.description.toLowerCase().includes(this.state.searchValue.toLowerCase()) ||
                    room.name.toLowerCase().includes(this.state.searchValue.toLowerCase()) ||
                    room.officeName.toLowerCase().includes(this.state.searchValue.toLowerCase()) ||
                    room.floor.toString().includes(this.state.searchValue)
            }
        });
        return (
            <Jumbotron>

                { this.props.user.currentUser && this.props.user.currentUser.role === 1 ?
                        <div>
                            <h3>All rooms</h3>
                            <div  className="add1" style={!this.props.rooms.length ? {justifyContent: "flex-end"}: {}}>
                                {!!this.props.rooms.length &&  <FormControl onChange={(e) => this.onSearchChange(e)} value={this.state.searchValue}  type="search" placeholder="Search room" style = {{ width: "25%"}}/>}
                                <Button
                                    type="button"
                                    bsStyle={this.state.addFieldIsVisible? 'warning': 'primary'}
                                    onClick={() => {this.toggleAddRoomField()}}>
                                    {this.state.addFieldIsVisible ? 'Cancel': 'Add'}
                                    </Button>
                            </div>
                            <div>
                                {(!!this.props.rooms.length || this.state.addFieldIsVisible) &&<div style={{display:  'flex', justifyContent: 'space-around'}}>
                                    <ControlLabel className="control-label" >Name</ControlLabel>
                                    <ControlLabel className="control-label" >Description</ControlLabel>
                                    <ControlLabel className="control-label" >Floor</ControlLabel>
                                    <ControlLabel className="control-label" >Office</ControlLabel>
                                </div>}
                                <form onSubmit={(e) => {this.addRoom(e)}}  style={!this.state.addFieldIsVisible ? {display: "none"} :{display:"flex"}}>
                                    <FormControl className="form-control"   type="text" onChange={(e) => this.onRoomNameChange(e)} value={this.state.roomName}  required />
                                    <FormControl className="form-control"   type="text" onChange={(e) => this.onRoomDescriptionChange(e)} value={this.state.roomDescription}  required />
                                    <FormControl className="form-control"   type="number" onChange={(e) => this.onRoomFloorChange(e)} value={this.state.roomFloor}  required />
                                    <FormControl componentClass="select"  onChange={(e) => this.onSelectChange(e)}  value={this.state.roomOfficeName} required>
                                        <option  defaultValue/>
                                        {this.props.offices.map((office) => {
                                            return <option value={office.name} key={office.id}>{office.name}</option>
                                        })}
                                        </FormControl>
                                    <Button type="submit"  bsStyle="success" >Save</Button>
                                </form>
                                {filteredRooms.map( (room) => {
                                    if(room.office) {
                                        return <RoomItem
                                            name={room.name}
                                            description={room.description}
                                            floor={room.floor}
                                            officeName={room.office.name}
                                            id={room.id}
                                            key={room.id}
                                        />
                                    } else {
                                        return <RoomItem
                                            name={room.name}
                                            description={room.description}
                                            floor={room.floor}
                                            officeName={room.officeName}
                                            id={room.id}
                                            key={room.id}
                                        />
                                    }
                                }) }
                                </div>
                        </div>
                    : <div>
                        <h3>Your haven't permission to view this page</h3>
                    </div>
                }
                </Jumbotron>
        );
    }
}
function mapStateToProps ({user, rooms, offices}) {
    return {
        user,
        rooms,
        offices
    }
}

export default connect(mapStateToProps)(RoomsContainer);