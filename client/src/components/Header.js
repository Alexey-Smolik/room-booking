import React from 'react';
import EventsFilter from './EventsFilter';

const Header = () => {
    return(
        <div className="reactHeader">
            <header>
                <EventsFilter />

            </header>

            <div id="heading">
                <blockquote>
                    <p className="text">Room booking</p>

                </blockquote>
            </div>
        </div>
    );
};

export default Header;