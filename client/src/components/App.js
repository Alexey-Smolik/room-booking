import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { NotificationContainer } from 'react-notifications';
import NavBar from './header/NavBar';
import LeftNavBar from './body/LeftNavBar';
import Calendar from './body/Calendar';
import HelloWindow from './body/HelloWindow';
import AuthComponent from './body/AuthComponent';
import Footer from './Footer/Footer';
import AdminPanel from './AdminPanel';
import Header from './header/Header';
import NotFound from './NotFound';

const App = () => (
    <div className="App">
        <BrowserRouter>
            <div>
                <Route  path="/" component={NavBar} />
                <Route exact path="/" component={Header} />
                <Route exact path="/" component={AuthComponent} />

                <div className="bodyWrapper">
                    <Route path="/room" component={LeftNavBar} />
                    <Switch>
                        <Route exact path="/room" component={HelloWindow} />
                        <Route path="/room/:roomID" component={Calendar} />
                        <Route exact path="/" component={Footer}  />
                        <Route path="/adminPanel" component={AdminPanel} />
                        <Route path="*" component={NotFound} />
                    </Switch>
                </div>
            </div>
        </BrowserRouter>
        <NotificationContainer/>
    </div>
);

export default connect()(App);
