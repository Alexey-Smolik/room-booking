import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { changeMode, getRoomsByPM, getEventsByPM, addPMId } from '../../actions';
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

    changeMode = () => {
        this.props.dispatch(changeMode());
    };


    handleSelect = (e) => {
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
                    NotificationManager.warning('Manager cannot be empty!', 'Event', 3000);
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
                <button onClick={this.handleSelect} style={{float: 'right'}}>Search</button>
                <button onClick={this.changeMode} style={{float: 'right'}}>Cancel</button>
            </div>

        );
    }
}

SearchUser.propTypes = {
    users: PropTypes.object,
};


export default connect()(SearchUser);




