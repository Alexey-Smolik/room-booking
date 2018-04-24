import React, { Component } from 'react';
import { connect } from 'react-redux';

class HelloWindow extends Component {
    render() {
        return (
            <h1>
                {this.props.user && this.props.user.currentUser ?
                    <p>Select a room</p>
                    : ''}
                    </h1>
        )
    }
}

const mapStateToProps = ({ user }) => ({
    user
});

export default connect(mapStateToProps)(HelloWindow);

