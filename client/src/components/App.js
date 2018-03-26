import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Route } from 'react-router-dom';
import TopNavBar from './TopNavBar';
import LeftNavBar from './LeftNavBar';
import Calendar from './Calendar';
import HelloWindow from './HelloWindow';
import AuthComponent from './AuthComponent';
import Footer from './Footer';
import {connect} from 'react-redux';

class App extends Component {

    render() {
        return (
            <div className="App">
                <BrowserRouter>
                    <div>
                        <TopNavBar />
                        <Route exact path="/"  component={AuthComponent} />
                        <Route path="/room"  component={LeftNavBar} />
                        <Route excat path="/room"  component={HelloWindow} />
                        <Route path="/room/:roomID"  component={Calendar} />
                        <Footer />
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}

export default connect(null, null)(App);