import React, { Component } from 'react';
import { connect } from 'react-redux';

class HelloWindow extends Component {
    render() {
        return (
            <div className={'hello-window'}>
                {this.props.user && this.props.user.currentUser ?
                    <h1>Select a room</h1>
                    : ''}
                    </div>
        )
    }
}

const mapStateToProps = ({ user }) => ({
    user
});

export default connect(mapStateToProps)(HelloWindow);

