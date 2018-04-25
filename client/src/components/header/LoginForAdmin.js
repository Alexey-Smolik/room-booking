import React from 'react';
import { ControlLabel } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const LoginForAdmin = (props) => {
    const { username } = props.user;
    return (
        <div style={{ marginBottom: '20px' }}>
        <Link className="link_search_to_btn" to="/room" style={{ width:'104px' }}>Home</Link>
        <form className="hello" name="search" action="#" method="get" style={{ display: 'inline-block', float: 'right' }}>
            <ControlLabel id="username_hello">Hello, {username || 'undefined'} </ControlLabel>
            <a className="link_log" href="/" onClick={() => props.logout()}>Log out</a>
        </form>
        </div>
    );
};
export default LoginForAdmin;