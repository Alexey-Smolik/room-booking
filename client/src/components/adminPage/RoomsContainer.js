import React from 'react';
import { connect } from 'react-redux';
import { Button, Nav, MenuItem, NavDropdown, ControlLabel, FormControl,Jumbotron, Tab, Tabs } from 'react-bootstrap';
import Calendar from '../Calendar';
import IssuesContainer from './IssuesContainer';
import ImagesContainer from './ImagesContainer';
import { LinkContainer } from 'react-router-bootstrap';
import RoomItem from './RoomItem'
import {
    createRoom,
    getEvents,
    getRoomIssues,
    getRooms,
    getCompanies,
    getRoomImages,
} from '../../actions/index';

class RoomsContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            roomName: '',
            roomFloor: '',
            roomDescription: '',
            roomCompanyName: '',
            addFieldIsVisible: false,
            searchValue: '',
        };
        this.props.dispatch(getRooms());
        this.props.dispatch(getCompanies());
    }
    addRoom(e) {
        let companyId = null;
        this.props.companies.forEach((company) => {
            if(company.name === this.state.roomCompanyName ) {
                companyId = company.id;
            }
        });
        const roomData = {
            name: this.state.roomName,
            description: this.state.roomDescription,
            floor: this.state.roomFloor,
            companyId: companyId,
        };
        this.props.dispatch(createRoom(roomData));
        this.props.dispatch(getRooms());
        this.toggleAddRoomField();
        this.setState({
            searchValue: '',
            roomName: '',
            roomFloor: '',
            roomCompanyName: '',
            roomDescription: '',
        });
        e.preventDefault()
    }
    toggleAddRoomField() {
        this.setState({
            addFieldIsVisible : !this.state.addFieldIsVisible
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
            roomCompanyName: e.target.value,
        });
        e.preventDefault();
    };
    render() {

        let filteredRooms = this.props.rooms.filter((room) => {
            return room.name.toLowerCase().includes(this.state.searchValue.toLowerCase()) ||
                room.description.toLowerCase().includes(this.state.searchValue.toLowerCase()) ||
                room.name.toLowerCase().includes(this.state.searchValue.toLowerCase()) ||
                room.company.name.toLowerCase().includes(this.state.searchValue.toLowerCase()) ||
                room.floor.toString().includes(this.state.searchValue)
        });

        return (
            <div>

                <Nav>
                    <NavDropdown eventKey={1} title="Select room" id="nav-dropdown">
                        <LinkContainer to={"/adminPanel/rooms/"} exact >
                            <MenuItem eventKey={1.0}>All rooms</MenuItem>
                        </LinkContainer>
                        <MenuItem divider />
                        { this.props.rooms.map((room, index) => {
                            return <LinkContainer to={"/adminPanel/rooms/" + room.id} onClick={()=> {
                                this.props.dispatch(getEvents(room.id));
                                this.props.dispatch(getRoomIssues(room.id));
                                this.props.dispatch(getRoomImages(room.id))
                            }} key={index}>
                                <MenuItem key={index}>{room.name}</MenuItem>
                                </LinkContainer>
                        })}
                    </NavDropdown>
                </Nav>
            <Jumbotron>
                { this.props.user && this.props.user.role === 1 ?
                    this.props.location.pathname !== '/adminPanel/rooms/' ?
                        <div>
                            <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
                                <Tab eventKey={1} title="Events calendar">
                                    <Calendar roomId = {this.props.location.pathname.slice(18)}/>
                                </Tab>
                                <Tab eventKey={2} title="Photos">
                                    <ImagesContainer  roomId={this.props.location.pathname.slice(18)}/>
                                </Tab>
                                <Tab eventKey={3} title="Issues" >
                                    <IssuesContainer issues={this.props.issues} roomId={this.props.location.pathname.slice(18)}/>
                                </Tab>
                            </Tabs>

                        </div>
                        : <div>
                            <h3>All rooms</h3>
                            <div  style={{display:  'flex'}}>
                                <FormControl onChange={(e) => this.onSearchChange(e)} value={this.state.searchValue}  type="search" placeholder="Search room"/>
                                <Button
                                    type="button"
                                    bsStyle={this.state.addFieldIsVisible? 'warning': 'primary'}
                                    onClick={() => {this.toggleAddRoomField()}}>
                                    {this.state.addFieldIsVisible ? 'Cancel': 'Add'}
                                    </Button>
                            </div>
                            <div>
                                <div style={{display:  'flex', justifyContent: 'space-around'}}>
                                    <ControlLabel className="control-label" >Name</ControlLabel>
                                    <ControlLabel className="control-label" >Description</ControlLabel>
                                    <ControlLabel className="control-label" >Floor</ControlLabel>
                                    <ControlLabel className="control-label" >Company</ControlLabel>
                                </div>
                                <form onSubmit={(e) => {this.addRoom(e)}}  style={!this.state.addFieldIsVisible ? {display: "none"} :{display:"flex"}}>
                                    <FormControl className="form-control"   type="text" onChange={(e) => this.onRoomNameChange(e)} value={this.state.roomName}  required />
                                    <FormControl className="form-control"   type="text" onChange={(e) => this.onRoomDescriptionChange(e)} value={this.state.roomDescription}  required />
                                    <FormControl className="form-control"   type="number" onChange={(e) => this.onRoomFloorChange(e)} value={this.state.roomFloor}  required />
                                    <FormControl componentClass="select"  onChange={(e) => this.onSelectChange(e)}  value={this.state.roomCompanyName} required>
                                        {this.state.roomCompanyName === '' && <option  defaultValue/>}
                                        {this.props.companies.map((company) => {
                                            return <option value={company.name} key={company.id}>{company.name}</option>
                                        })}
                                        </FormControl>
                                    <Button type="submit"  bsStyle="success" >Save</Button>
                                </form>
                                {filteredRooms.map( (room) => {
                                    if(room.company) {
                                        return <RoomItem
                                            name={room.name}
                                            description={room.description}
                                            floor={room.floor}
                                            companyName={room.company.name}
                                            id={room.id}
                                            key={room.id}
                                        />
                                    } else {
                                        return <RoomItem
                                            name={room.name}
                                            description={room.description}
                                            floor={room.floor}
                                            companyName={this.state.roomCompanyName}
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
            </div>
        );
    }
}
function mapStateToProps ({user, rooms, companies, issues}) {
    return {
        user: user,
        rooms: rooms,
        companies: companies,
        issues: issues,
    }
}

export default connect(mapStateToProps)(RoomsContainer);