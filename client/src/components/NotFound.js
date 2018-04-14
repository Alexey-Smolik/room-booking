import React from 'react';
import Header from './header/Header';
import Footer from './Footer/Footer';
import {Link} from 'react-router-dom';

const NotFound  = () => {

    return(

        <div className="body_404">
            <Header />
            <div>
                {/*<img style={{ width: '100%', height: '80vh', backgroundSize: 'cover' }} src="http://ak7.picdn.net/shutterstock/videos/16409197/thumb/1.jpg" alt="404" />*/}
                <h1 className="p_404">404<br/>Incorrect URL address</h1>
            </div>
            <div className="container_for_404">
                <Link className="link_404" to={'/room/'} title="Go home">Home</Link>
            </div>


        </div>
    );
};

export default NotFound;