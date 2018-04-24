import React from 'react';
import {Nav, NavItem, MenuItem, NavDropdown, Jumbotron } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import {  Route, Link } from 'react-router-dom';
import {
    getRooms,
    getCompanies,
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
import CompaniesContainer from "./adminPage/CompaniesContainer";
import UsersContainer from "./adminPage/UsersContainer";
import IssuesContainer from "./adminPage/IssuesContainer";
import InnerRoomContainer from "./adminPage/InnerRoomContainer";
import HelloAdmin from './HelloAdmin';
import LoginForAdmin from './header/LoginForAdmin';



import './adminPage/adminPanel.css';

class AdminPanel extends React.Component {
    constructor(props) {
        super(props);
    }

componentDidMount() {
    this.props.dispatch(getCurrentUser());
    this.props.dispatch(getRooms());
}
    render() {
        let {user, issues, rooms} = this.props;
        return (
        <div style={{ width: "100%" }}>

            {user.currentUser && <LoginForAdmin user={user.currentUser} logout={() => this.props.dispatch(deleteCurrentUser())}/>}

            {user && user.currentUser && user.currentUser.role === 1 ?
                <div >
                    <Route exact path="/adminPanel" component={HelloAdmin} />

                    <Nav bsStyle="pills">
                        <LinkContainer to="/adminPanel/companies/">
                            <NavItem eventKey={1} onClick={() => {this.props.dispatch(getCompanies())}}>Companies</NavItem>
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

                    <Route path="/adminPanel/companies/"  component={CompaniesContainer}/>
                    <Route exact path="/adminPanel/rooms/" component={RoomsContainer}/>
                    <Route path="/adminPanel/rooms/:roomID" component={InnerRoomContainer}/>
                    <Route path="/adminPanel/users/" component={UsersContainer}/>
                    <Route path="/adminPanel/issues/" render={()=><Jumbotron><IssuesContainer issues = {issues} /></Jumbotron>}/>
                </div>
                :  user.isLoaded && <div>
                    <h1 className="p_404">Sorry, your haven't permission to view this page</h1>
                    <div className="container_for_404">
                        <Link className="link_404" to={'/'} title="Go auth">Auth</Link>
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

