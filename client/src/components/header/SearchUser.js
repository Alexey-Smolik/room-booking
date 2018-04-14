import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import {Link} from 'react-router-dom';
import { changeMode, getRoomsByPM, addPMId, getRooms } from '../../actions';
import {NotificationManager} from 'react-notifications';


import "react-select/dist/react-select.css";
import "react-virtualized/styles.css";
import "react-virtualized-select/styles.css";
import Select from 'react-select';


class SearchUser extends React.Component {
    state = {
        selectedOption: '',
    };

    handleChange = (selectedOption) => {
        this.setState({selectedOption});
    };

    cancelSearch = () => {
        this.props.dispatch(changeMode());
        this.props.dispatch(getRooms());
        this.setState({ selectedOption: ''});
    };

    handleSelect = (e) => {
        this.props.dispatch(changeMode("PM_SEARCH"));
        this.props.dispatch(addPMId(this.state.selectedOption.value));
        this.props.dispatch(getRoomsByPM(this.state.selectedOption.value));
        //this.props.dispatch(getEventsByPM(this.state.selectedOption.value));
        e.preventDefault();

        if(typeof this.state.selectedOption === 'string') this.createNotification('empty pm')();
        else if(typeof this.state.selectedOption === 'object' && !this.state.selectedOption) this.createNotification('empty pm')();
        else {
            this.props.dispatch(changeMode("PM_SEARCH"));
            this.props.dispatch(addPMId(this.state.selectedOption.value));
            this.props.dispatch(getRoomsByPM(this.state.selectedOption.value));
            this.createNotification('search')();
        }
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
                    NotificationManager.success('Search successfully conducted', 'Event', 3000);
                    break;
                case 'empty pm':
                    NotificationManager.warning('Search cannot be empty!Please, fill the fields!', 'Event', 3000);
                    break;
            }
        };
    };

    render() {
        const {selectedOption} = this.state;
        const value = selectedOption && selectedOption.value;
        let options = this.getOptions();
        return (
            <div className="pm-search" style={{width: "500px", margin: "15px"}}>
                {options && <Select
                    style={{width: "450px", float: "left"}}
                    name="form-field-name"
                    value={value}
                    onChange={this.handleChange}
                    options={options}
                />}
                <Link className="link_search_to_btn" to={'/room/'} onClick={this.handleSelect} style={{float: 'right'}}>Search</Link>
                <Link className="link_search_to_btn" to={'/room/'} onClick={this.cancelSearch} style={{float: 'right'}}>Cancel</Link>

            </div>

        );
    }
}

SearchUser.propTypes = {
    users: PropTypes.object,
};


export default connect()(SearchUser);




