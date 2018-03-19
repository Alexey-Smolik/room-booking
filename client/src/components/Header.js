import React from 'react';

const Header = () => {
    return(
        <div className="reactHeader">

            <header>
                <form className="hello" name="search" action="#" method="get">
                    <label id="username">Hello, </label>
                    <button type="submit">Log out</button>
                </form>

            </header>

            <div id="heading">
                <blockquote>
                    <p className="text">Room Booking</p>
                </blockquote>
            </div>
        </div>
    );
};

export default Header;