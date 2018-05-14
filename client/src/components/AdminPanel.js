import React from 'react';
import {Nav, NavItem, MenuItem, NavDropdown, Jumbotron } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import {  Route, Link } from 'react-router-dom';
import {
    getRooms,
    getOffices,
    getCurrentUser,
    getAllUsers,
    getAllIssues,
    getRoomImages,
    getRoomIssues,
    getEvents,
    deleteCurrentUser,
} from "../actions";
import 'react-datepicker/dist/react-datepicker.css';
import {connect} from "react-redux";
import RoomsContainer from "./adminPage/RoomsContainer";
import OfficesContainer from "./adminPage/OfficesContainer";
import UsersContainer from "./adminPage/UsersContainer";
import IssuesContainer from "./adminPage/IssuesContainer";
import InnerRoomContainer from "./adminPage/InnerRoomContainer";
import LoginForAdmin from './header/LoginForAdmin';
import { PulseLoader } from 'react-spinners';



import './adminPage/adminPanel.css';

class AdminPanel extends React.Component {

    componentDidMount() {
        this.props.dispatch(getCurrentUser());
        this.props.dispatch(getRooms());
    }

    render() {
        let {user, issues, rooms} = this.props;
        return (
        <div style={{ width: "100%"}}>
            {!this.props.user.isAuthenticated && this.props.user.isLoaded &&  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <h1>
                    <p style={{ color: '#B71C1C', fontSize: '50px' }}>Sorry, no access<br/>Authorize please</p>
                    <Link className="link_404_1" to={'/'}  style={{ fontWeight: 'normal' }}>Sign in</Link>
                </h1>
            </div>}
                {this.props.user.isLoaded && this.props.user.isAuthenticated && this.props.user.currentUser.role ===1 ?
                <div >
                    {user.currentUser &&  <LoginForAdmin user={user.currentUser} logout={() => this.props.dispatch(deleteCurrentUser())}/>}
                    <Nav bsStyle="pills">
                        <LinkContainer to="/adminPanel/offices/">
                            <NavItem eventKey={1} onClick={() => {this.props.dispatch(getOffices())}}>Offices</NavItem>
                        </LinkContainer>
                        <NavDropdown eventKey={1} title="Select room" id="nav-dropdown">
                            <LinkContainer to={"/adminPanel/rooms/"} exact >
                                <MenuItem eventKey={1.0}>All rooms</MenuItem>
                            </LinkContainer>
                            <MenuItem divider />
                            { rooms.map((room, index) => {
                                return <LinkContainer to={"/adminPanel/rooms/" + room.id} onClick={()=> {
                                    this.props.dispatch(getEvents(room.id));
                                    this.props.dispatch(getRoomIssues(room.id));
                                    this.props.dispatch(getRoomImages(room.id))
                                }} key={index}>
                                    <MenuItem key={index}>{room.name}</MenuItem>
                                </LinkContainer>
                            })}
                            </NavDropdown>
                        <LinkContainer to="/adminPanel/users/">
                            <NavItem eventKey={3} onClick={() => {this.props.dispatch(getAllUsers())}}>Users</NavItem>
                        </LinkContainer>
                        <LinkContainer to="/adminPanel/issues/">
                            <NavItem eventKey={4} onClick={() => {this.props.dispatch(getAllIssues())}}>Issues</NavItem>
                        </LinkContainer>
                    </Nav>

                    <Route path="/adminPanel/offices/"  component={OfficesContainer}/>
                    <Route exact path="/adminPanel/rooms/" component={RoomsContainer}/>
                    <Route path="/adminPanel/rooms/:roomID" component={InnerRoomContainer}/>
                    <Route path="/adminPanel/users/" component={UsersContainer}/>
                    <Route path="/adminPanel/issues/" render={()=><Jumbotron><IssuesContainer issues = {issues} /></Jumbotron>}/>
                </div>

                :
                (!user.isAuthenticated) && <div>
                    <div style={{ position: "absolute", top:"45%", left: "50%"}}>
                        <PulseLoader
                            color={'#d32f2f'}
                            loading={!this.props.user.isLoaded}/>
                    </div>
                </div>}
        </div>
        );
    }
}
function mapStateToProps({issues, rooms, user}) {
    return {
        issues,
        rooms,
        user
    }
}
export default connect(mapStateToProps)(AdminPanel);

