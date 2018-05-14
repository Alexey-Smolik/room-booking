import React from 'react';
import { connect } from 'react-redux';
import { Button, ControlLabel , FormControl,Jumbotron } from 'react-bootstrap';
import UserItem from './UserItem'
import {
    getAllUsers,
    addUserDB
} from '../../actions/index';

class UsersContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            userPassword: '',
            userRole: '',
            userEmail: '',
            searchValue: '',
            addFieldIsVisible: false,
        };
    }
    componentWillMount() {
        this.props.dispatch(getAllUsers());
    }
    addUser(e) {
        const userData = {
            username: this.state.username,
            password: this.state.userPassword,
            email: this.state.userEmail,
            role: this.state.userRole,
        };
        this.props.dispatch(addUserDB(userData));
        this.toggleAddUserField();
        e.preventDefault();
    }
    toggleAddUserField() {
        this.setState({
            addFieldIsVisible : !this.state.addFieldIsVisible,
            username: '',
            userPassword: '',
            userEmail: '',
            userRole: '',
        })
    }
    onUsernameChange (e) {
        this.setState({
            username: e.target.value,
        });
        e.preventDefault();
    };
    onUserPasswordChange (e) {
        this.setState({
            userPassword: e.target.value,
        });
        e.preventDefault();
    };
    onUserEmailChange (e) {
        this.setState({
            userEmail: e.target.value,
        });
        e.preventDefault();
    };
    onUserRoleChange (e) {
        this.setState({
            userRole: e.target.value,
        });
        e.preventDefault();
    };
    onSearchChange (e) {
        this.setState({
            searchValue: e.target.value,
        });
        e.preventDefault();
    };
    render() {
        let filteredUsers = this.props.user && this.props.user.allUsers && this.props.user.allUsers.filter((user) => {
            return user.username.toLowerCase().includes(this.state.searchValue.toLowerCase()) ||
                user.role.toString().includes(this.state.searchValue) ||
                user.email.toString().includes(this.state.userEmail.toLowerCase())
        });
        return (
            <Jumbotron>
                { this.props.user.currentUser && this.props.user.currentUser.role === 1 ?
                    <div>
                        <h3>All users</h3>
                        <div  className = "add1" >
                            <FormControl onChange={(e) => this.onSearchChange(e)} value={this.state.searchValue}  type="search" placeholder="User search" style = {{ width: "25%", marginRight: "10px" }}/>
                            <Button
                                type="button"
                                bsStyle={this.state.addFieldIsVisible? 'warning': 'primary'}
                                onClick={() => {this.toggleAddUserField()}}>
                                {this.state.addFieldIsVisible ? 'Cancel': 'Add'}
                            </Button>
                        </div>
                        <div>
                            <div style={{display:  'flex', justifyContent: 'space-around'}}>
                                <ControlLabel className="control-label" >Username</ControlLabel>
                                <ControlLabel className="control-label" >Email</ControlLabel>
                                <ControlLabel className="control-label" >Password</ControlLabel>
                                <ControlLabel className="control-label" >Role</ControlLabel>
                            </div>
                            <form onSubmit={(e) => {this.addUser(e)}} style={!this.state.addFieldIsVisible ? {display: "none"} :{display:"flex"}}>
                                <FormControl className="form-control" type="text" onChange={(e) => this.onUsernameChange(e)} value={this.state.username}  required />
                                <FormControl className="form-control" type="email" onChange={(e) => this.onUserEmailChange(e)} value={this.state.userEmail}  required />
                                <FormControl className="form-control" type="text" onChange={(e) => this.onUserPasswordChange(e)} value={this.state.userPassword} required/>
                                <FormControl className="form-control" type="number" min="1" max="3" onChange={(e) => this.onUserRoleChange(e)} value={this.state.userRole} required/>
                                <Button type="submit"  bsStyle="success" >Save</Button>
                            </form>
                            { filteredUsers && filteredUsers.map( (user) => {
                                return <UserItem
                                    name={user.username}
                                    password={user.password}
                                    email={user.email}
                                    role={user.role}
                                    key={user.id}
                                    id={user.id}
                                />
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
function mapStateToProps ({user}) {
    return {
        user: user,
    }
}

export default connect(mapStateToProps)(UsersContainer);