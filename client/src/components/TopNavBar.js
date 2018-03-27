import React from 'react';
import {connect} from "react-redux";
import PropTypes from 'prop-types';

import TopEventSearch from './header/TopEventSearch';
import TopHeader from './header/TopHeader';



class TopNavBar extends React.Component {
    render() {

        let user = this.props.user;
        console.log(this.props);
        return (
            <div className="reactHeader">
                {user && <TopEventSearch  user={this.props.user}/>}
                <TopHeader/>
            </div>
        );
    }
}

TopNavBar.defaultProps = {
    user: "Undefined"
};

TopNavBar.propTypes = {
    optionalObjectWithShape: PropTypes.shape({
        user: PropTypes.object
    })
};

function mapStateToProps({ user }) {
    return {
        user: user
    };
}

export default connect(mapStateToProps)(TopNavBar);