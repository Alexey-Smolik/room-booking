import React , { Component } from 'react';

class Header extends Component {
    render() {
        return(
            <div className="reactHeader">
                <header>
                    <form className="hello" name="search" action="#" method="get">
                        <label id="username">HELLO,</label>
                        <button type="submit">Log out</button>
                    </form>
                </header>
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
