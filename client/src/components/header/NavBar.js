import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import LoginSection from './LoginSection';
import SearchManager from './SearchManager';
import Header from './Header';
import {deleteCurrentUser} from "../../actions";


class NavBar extends React.Component {
    render() {
        let user =  this.props.user || null;
        let currentUser = this.props.user.currentUser || null;
        return (
            <div className="reactHeader">
                {currentUser && <SearchManager user={currentUser}/>}
                {currentUser && <LoginSection user={currentUser} logout={() => this.props.dispatch(deleteCurrentUser())}/>}
                <Header/>
            </div>
        );
    }
};


const mapStateToProps = ({ user }) => ({
    user,
});

export default connect(mapStateToProps)(NavBar);