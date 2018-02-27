import React , { Component } from 'react';
// import { connect } from 'react-redux';


class Header extends Component {
    render() {
        return(
            <div className="reactHeader">
                <header>
                    <form className="hello" name="search" action="#" method="get">
                        <label id="username">HELLO, fjbgokdfmbdfjodfbmfbmdfbmdfbdfbmfkldfmbkldmfbkmffdm</label>
                        <button type="submit">Log out</button>
                    </form>
                </header>
                <nav>
                    <ul className="top-menu">
                        <li><a href="/home/">HOME</a></li>
                        <li><a href="/year/">YEAR</a></li>
                        <li><a href="/month/">MONTH</a></li>
                        <li className="active"><a href="/week/">WEEK</a></li>
                        <li><a href="/day/">DAY</a></li>

                    </ul>
                </nav>
                <div id="heading">
                    <blockquote>
                        <p className="text">Выберите для Вас подходящий офис или роскошную комнату!</p>
                    </blockquote>
                </div>  
            </div> 
        );
    }
}

export default Header; 