import React from 'react';
import {Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import {  Route } from 'react-router-dom';
import {
    getRooms,
    getCompanies,
    getCurrentUser,
    getAllUsers,
    getAllIssues,
} from "../actions";
import 'react-datepicker/dist/react-datepicker.css';
import {connect} from "react-redux";
import RoomsContainer from "./adminPage/RoomsContainer";
import CompaniesContainer from "./adminPage/CompaniesContainer";
import UsersContainer from "./adminPage/UsersContainer";
import IssuesContainer from "./adminPage/IssuesContainer";


class AdminPanel extends React.Component {
    constructor(props) {
        super(props);
        this.props.dispatch(getCurrentUser());
    }

    render() {
        return (
            <div>

                <Nav bsStyle="pills">
                    <LinkContainer to="/adminPanel/companies/">
                        <NavItem eventKey={1} onClick={() => {this.props.dispatch(getCompanies())}}>Companies</NavItem>
                    </LinkContainer>
                    <LinkContainer to="/adminPanel/rooms/">
                        <NavItem eventKey={2} onClick={() => {this.props.dispatch(getRooms())}}>Rooms</NavItem>
                    </LinkContainer>
                    <LinkContainer to="/adminPanel/users/">
                        <NavItem eventKey={3} onClick={() => {this.props.dispatch(getAllUsers())}}>Users</NavItem>
                    </LinkContainer>
                    <LinkContainer to="/adminPanel/issues/">
                        <NavItem eventKey={4} onClick={() => {this.props.dispatch(getAllIssues())}}>Issues</NavItem>
                    </LinkContainer>
                    </Nav>

                <Route path="/adminPanel/companies/"  component={CompaniesContainer}/>
                <Route path="/adminPanel/rooms/" component={RoomsContainer}/>
                <Route path="/adminPanel/users/" component={UsersContainer}/>
                <Route path="/adminPanel/issues/" render={()=><IssuesContainer issues = {this.props.issues} />}/>
            </div>
        );
    }
}
function mapStateToProps({issues}) {
    return {
        issues: issues,
    }
}
export default connect(mapStateToProps,null)(AdminPanel);

