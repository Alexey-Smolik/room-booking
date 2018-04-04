import React from 'react';
import { ControlLabel } from 'react-bootstrap';


const LoginSection = (props) => {
    const { username } = props.user;
    return (
    <form className="hello" name="search" action="#" method="get">
      <ControlLabel id="username_hello">Hello, {username || 'undefined'} </ControlLabel>
      <a className="link_log" href="/" onClick={() => props.logout()}>Log out</a>
    </form>
    );
};
export default LoginSection;



