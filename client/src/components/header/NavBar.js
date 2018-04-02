import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import LoginSection from './LoginSection';
import TopEventSearch from './SearchManager';
import Header from './Header';
import {deleteCurrentUser} from "../../actions";


const NavBar = (props) => {
    const { user } = props;
    console.log(user);

    return (
        <div className="reactHeader">
            {user && <TopEventSearch user={user} />}
            {user && <LoginSection user={user} logout={() => this.props.dispatch(deleteCurrentUser())} />}
            <Header />
        </div>
    );
};



NavBar.defaultProps = {
    user: 'undefined',
};

NavBar.propTypes = {
    user: PropTypes.object,
};


const mapStateToProps = ({ user }) => ({
    user,
});

export default connect(mapStateToProps)(NavBar);