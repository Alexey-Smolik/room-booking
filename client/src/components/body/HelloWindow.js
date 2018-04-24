import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class HelloWindow extends Component {
    render() {
        return (
            <h1>
                {this.props.user && this.props.user.currentUser ?
                    <p>Select a room</p>
                    : <div>
                        <p style={{ color: '#B71C1C', fontSize: '50px' }}>Sorry, no access<br/>Authorize please</p>
                            <Link className="link_404" to={'/'}  style={{ fontWeight: 'normal' }}>Sign in</Link>
                      </div> }
            </h1>
        )
    }
}

const mapStateToProps = ({ user }) => ({
    user
});

export default connect(mapStateToProps)(HelloWindow);

