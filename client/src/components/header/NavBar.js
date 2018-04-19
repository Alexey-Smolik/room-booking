import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import LoginSection from './LoginSection';
import SearchManager from './SearchManager';
import SearchUser from './SearchUser';
import {deleteCurrentUser, getManagers} from "../../actions";
import {NotificationManager} from "react-notifications";


class NavBar extends React.Component {

    componentWillMount(){
        this.props.dispatch(getManagers());
    }




    render() {
        let user =  this.props.user || null;
        let {managers, currentUser} = this.props.user || null;
        let role = this.props.role;
        return (
            <div className="reactHeader">
                {(role < 3 )  ?
                    currentUser && <SearchManager user={currentUser}/>
                    :
                    currentUser && <SearchUser users={managers}/>
                }

                {currentUser && <LoginSection user={currentUser} logout={() => this.props.dispatch(deleteCurrentUser())}/>}
            </div>
        );
    }
};


const mapStateToProps = ({ user }) => ({
    user,
    role: user.currentUser && user.currentUser.role
});

export default connect(mapStateToProps)(NavBar);
