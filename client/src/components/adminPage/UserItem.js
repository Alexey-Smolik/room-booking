import React from 'react';
import { Button, FormGroup , ControlLabel , FormControl,Jumbotron } from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router'
import {
    deleteUserDB,
    editUserDB,
} from '../../actions/index'

class CompanyItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            btnText: 'Edit',
            username: this.props.name,
            password: this.props.password,
            role: this.props.role,
            isFieldEditing: false,
        };
    }

    changeUserData = (e,id) => {
        this.setState({
            btnText: 'Save',
            isFieldEditing: true,
        });

        const userData = {
            username: this.state.username,
            password: this.state.password,
            role: this.state.role,
        };

        if(this.state.btnText === 'Save') {
            this.props.dispatch(editUserDB(id,userData));
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
        });
        e.preventDefault();
    };
    onUserPasswordChange (e) {
        this.setState({
            password: e.target.value,
        });
        e.preventDefault();
    };
    onUserRoleChange (e) {
        this.setState({
            role: e.target.value,
        });
        e.preventDefault();
    };

    render() {
        const {id} = this.props;
        const { isFieldEditing, btnText} = this.state;
        return (
            <div style={{display:  'flex', paddingBottom: '15px'}}>
                <FormControl  type="text" value={this.state.username} onChange={(e) => this.onUsernameChange(e)}  disabled={!isFieldEditing}/>
                <FormControl  type="text" value={this.state.password} onChange={(e) => this.onUserPasswordChange(e)}   disabled={!isFieldEditing || !this.state.password}/>
                <FormControl  type="number" value={this.state.role} min="1" max="3" onChange={(e) => this.onUserRoleChange(e)}   disabled={!isFieldEditing}/>
                <Button type="submit" bsStyle={isFieldEditing? 'success': 'primary'} onClick={(e)=> {this.changeUserData(e,id)}} >{btnText}</Button>
                <Button type="button" bsStyle='danger' onClick={() => {
                    this.props.dispatch(deleteUserDB(this.props.id));
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
function mapStateToProps ({user}) {
    return {
        user: user
    }
}

export default connect(mapStateToProps)(CompanyItem);