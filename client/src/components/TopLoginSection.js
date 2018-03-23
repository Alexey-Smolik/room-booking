import React from 'react';



class TopLoginSection extends React.Component {
    render() {
        var user = this.props.user && this.props.user.username;
        console.log("Login", user);

        return(
            user ?
            <form className="hello" name="search" action="#" method="get">
                <label id="username_hello">Hello, {this.props.user.username} </label>
                <a className="link_log" href="/auth/logout">Log out</a>
            </form> :
            null
        )
    }
}



export default TopLoginSection;



