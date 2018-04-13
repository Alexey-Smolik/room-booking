import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import {changeMode, getRoomsByPM, getEventsByPM, addPMId, getRooms} from '../../actions';
import {Link} from 'react-router-dom';


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



    render() {
        const {selectedOption} = this.state;
        const value = selectedOption && selectedOption.value;
        let options = this.getOptions();
        return (
            <div className="pm-search" style={{width: "500px", margin: "15px"}}>
                {options && <Select
                    clearable={false}
                    style={{width: "450px", float: "left"}}
                    name="form-field-name"
                    value={value}
                    onChange={this.handleChange}
                    options={options}
                />}
                <Link to={'/room/'} onClick={this.handleSelect} style={{float: 'right'}}>Search</Link>
                <Link to={'/room/'} onClick={this.cancelSearch} style={{float: 'right'}}>Cancel</Link>

            </div>

        );
    }
}

SearchUser.propTypes = {
    users: PropTypes.object,
};


export default connect()(SearchUser);




