import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import {Link, NavLink} from 'react-router-dom';
import { changeMode, getRoomsByCurrentUser, addPMId, getRooms } from '../../actions';
import {NotificationManager} from 'react-notifications';





import "react-select/dist/react-select.css";
import "react-virtualized/styles.css";
import "react-virtualized-select/styles.css";
import Select from 'react-select';


class SearchUser extends React.Component {
    state = {
        selectedOption: '',
        isClick: false
    };

    handleChange = (selectedOption) => {
        this.setState({selectedOption});
    };

    cancelSearch = () => {
        this.props.dispatch(changeMode());
        this.props.dispatch(getRooms());
        this.createNotification('cancel')();
        this.setState({ selectedOption: '', isClick: false });
    };

    handleSelect = (e) => {
        this.props.dispatch(changeMode("PM_SEARCH"));
        e.preventDefault();

        this.props.dispatch(getRoomsByCurrentUser(this.props.user.currentUser.id));
        this.createNotification('search')();
        this.setState({
            isClick: true
        })
    };

    getOptions = () => {
        let options = this.props.users;
        return options && options.map( (user) => {
            return {
                label: user.username,
                value: user.id
            }
        })
    };

    createNotification = (type) => {
        return () => {
            switch (type) {
                case 'search':
                    NotificationManager.success('My invitations mod is ON', 'Events', 3000);
                    break;
                case 'cancel':
                    NotificationManager.success('My invitations mod is OFF', 'Events', 3000);
                    break;
                case 'empty pm':
                    NotificationManager.warning('Search cannot be empty!Please, fill the fields!', 'Events', 3000);
                    break;
            }
        };
    };

    render() {
        const {selectedOption} = this.state;
        const value = selectedOption && selectedOption.value;
        let options = this.getOptions();
        return (
            <div className="pm-search" style={{width: "500px"}}>
                {options && <Select
                    style={{width: "450px", float: "left"}}
                    name="form-field-name"
                    value={value}
                    onChange={this.handleChange}
                    options={options}
                />}

                <p className="invitations">My invitations:</p>
                <Link className="link_search_to_btn_mod" to={'/room/'}  onClick={this.handleSelect} style={{float: 'right'}}>{this.state.isClick ? 'ON' : 'OFF'}</Link>
                <Link className="link_search_to_btn" to={'/room/'} onClick={this.cancelSearch} style={{float: 'right'}}>Cancel</Link>
            </div>

        );
    }
}

SearchUser.propTypes = {
    users: PropTypes.object,
};

const mapStateToProps = ({ user }) => ({
    user,
    role: user.currentUser && user.currentUser.role
});

export default connect(mapStateToProps)(SearchUser);