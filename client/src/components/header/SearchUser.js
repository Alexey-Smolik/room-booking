import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { changeMode, getRoomsByCurrentUser, addPMId, getRooms } from '../../actions';
import {NotificationManager} from 'react-notifications';
import ToggleButton from 'react-toggle-button';




import "react-select/dist/react-select.css";
import "react-virtualized/styles.css";
import "react-virtualized-select/styles.css";
import Select from 'react-select';

const borderRadiusStyle = { borderRadius: 0 }
class SearchUser extends React.Component {
    state = {
        selectedOption: '',
        isClicked: false
    };

    handleChange = (selectedOption) => {
        this.setState({selectedOption});
    };


    handleSelect = (isClicked) => {
        if(isClicked) {
            this.props.dispatch(changeMode("PM_SEARCH"));
            this.props.dispatch(getRoomsByCurrentUser(this.props.user.currentUser.id));
            this.createNotification('search')();
        } else {
            this.props.dispatch(changeMode());
            this.props.dispatch(getRooms());
            this.createNotification('cancel')();
            this.setState({
                selectedOption: ''
            });
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

                 {/*Toggle btn for users*/}
                <p className="invitations">My invitations:</p>
                <ToggleButton
                    value={ this.state.isClicked}
                    thumbStyle={borderRadiusStyle}
                    trackStyle={borderRadiusStyle}
                    onToggle={(value) => {
                        this.setState({
                            isClicked: !value,
                        });
                        this.handleSelect(!value)
                    }}
                />
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