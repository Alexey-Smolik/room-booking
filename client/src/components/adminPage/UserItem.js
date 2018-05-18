import React from 'react';
import { Button, FormControl } from 'react-bootstrap';
import { connect } from 'react-redux';
import {
    deleteUserDB,
    editUserDB,
} from '../../actions/index'

class UserItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            btnText: 'Edit',
            username: this.props.name,
            password: this.props.password,
            email: this.props.email,
            role: this.props.role,
            isFieldEditing: false,
        };
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.password !== nextProps.password) {
           this.setState({
               password: nextProps.password
           })
        }
    }
    changeUserData = (e,id) => {
        this.setState({
            btnText: 'Cancel',
            isFieldEditing: true,
        });
        let userData  = {
            id: id,
            username: this.state.username,
            password: this.state.password,
            email: this.state.email,
            role: this.state.role
            };
        if(this.state.btnText === 'Save') {
            this.props.dispatch(editUserDB(id,userData));
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
    onUsernameChange (e) {
        this.setState({
            username: e.target.value,
            btnText: 'Save',
        });
        e.preventDefault();
    };
    onUserPasswordChange (e) {
        this.setState({
            password: e.target.value,
            btnText: 'Save',
        });
        e.preventDefault();
    };
    onUserEmailChange(e) {
        this.setState({
            email: e.target.value,
            btnText: 'Save',
        });
        e.preventDefault();
    }
    onUserRoleChange (e) {
        this.setState({
            role: e.target.value,
            btnText: 'Save',
        });
        e.preventDefault();
    };

    render() {
        const {id, password} = this.props;
        const { isFieldEditing, btnText} = this.state;
        return (
            <form onSubmit={(e)=> {this.changeUserData(e,id)}} style={{display:  'flex'}}>
                <FormControl  type="text" value={this.state.username} onChange={(e) => this.onUsernameChange(e)}  disabled={!isFieldEditing} required/>
                <FormControl  type="email" value={this.state.email} onChange={(e) => this.onUserEmailChange(e)}   disabled={!isFieldEditing} required/>
                <FormControl  type="text" value={this.state.password} onChange={(e) => this.onUserPasswordChange(e)}   disabled={!isFieldEditing || !password} required/>
                <FormControl  type="number" value={this.state.role} min="1" max="3" onChange={(e) => this.onUserRoleChange(e)}   disabled={!isFieldEditing} required/>
                <Button type="submit" bsStyle={isFieldEditing? 'success': 'primary'} >{btnText}</Button>
                <Button type="button" bsStyle='danger' onClick={() => {
                    this.props.dispatch(deleteUserDB(id));
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

export default connect()(UserItem);