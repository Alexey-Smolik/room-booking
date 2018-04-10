import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import LoginSection from './LoginSection';
import SearchManager from './SearchManager';
import SearchUser from './SearchUser';
import Header from './Header';
import {deleteCurrentUser, getAllUsers} from "../../actions";


class NavBar extends React.Component {

    componentWillMount(){
        this.props.dispatch(getAllUsers());
    }


    render() {
        let user =  this.props.user || null;
        let {allUsers, currentUser} = this.props.user || null;

        console.log(allUsers);
        return (
            <div className="reactHeader">
                {currentUser && <SearchManager user={currentUser}/>}
                {currentUser && <LoginSection user={currentUser}
                                              logout={() => this.props.dispatch(deleteCurrentUser())}/>}
                <SearchUser users={allUsers} />
                <Header/>
            </div>
        );
    }
};


const mapStateToProps = ({ user }) => ({
    user,
});

export default connect(mapStateToProps)(NavBar);