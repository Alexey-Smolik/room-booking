import React from 'react';

const TopLoginSection = (props) => {

    let user =  props.user.username;
    return(
        <form className="hello" name="search" action="#" method="get">
            <label id="username_hello">Hello, {user || 'undefined'} </label>
            <a  className="link_log" href="/" onClick={ () => this.props.logout() }>Log out</a>
        </form>
    );
};
export default TopLoginSection;



