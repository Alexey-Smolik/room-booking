import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import { getAllUsers, SearhRoomsByPM } from '../../actions';


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

    handleSelect = (e) => {
        e.preventDefault();
        this.props.dispatch(SearhRoomsByPM(this.state.selectedOption.value));
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
                    style={{width: "450px", float: "left"}}
                    name="form-field-name"
                    value={value}
                    onChange={this.handleChange}
                    options={options}
                />}
                <button onClick={this.handleSelect} style={{float: 'right'}}>Ok</button>
            </div>

        );
    }
}

SearchUser.propTypes = {
    users: PropTypes.object,
};


export default connect()(SearchUser);




