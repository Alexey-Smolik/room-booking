import React from 'react';

const Header = () => {
    return(
        <div className="reactHeader">
            <header>
                <form className="hello" name="search" action="#" method="get">
                    <label id="username">Hello, </label>
                    <button href="/auth/logout" type="submit">Log out</button>
                </form>
            </header>

            <div id="heading">
                <blockquote>
                    <p className="text">Выберите для Вас подходящий офис! Ваше удобство - наша забота!</p>
                </blockquote>
            </div>
        </div>
    );
};

export default Header;