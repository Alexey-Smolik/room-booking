import React from 'react';



class TopLoginSection extends React.Component {
    render() {
        var user = this.props.user;

        console.log(this.props);
        return(
            user ?
            <form className="hello" name="search" action="#" method="get">
                <label id="username_hello">Hello, {this.props.user} </label>
                <a className="link_log" href="/auth/logout">Log out</a>
            </form> :
            null
        )
    }
}



export default TopLoginSection;



