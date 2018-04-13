import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NavBar from './header/NavBar';
import LeftNavBar from './body/LeftNavBar';
import Calendar from './body/Calendar';
import HelloWindow from './body/HelloWindow';
import AuthComponent from './body/AuthComponent';
import Footer from './Footer/Footer';
import AdminPanel from './AdminPanel';
import HelloAdmin from './HelloAdmin';



const App = () => (
    <div className="App">
        <BrowserRouter>
            <div>
                <NavBar />
                <Route exact path="/" component={AuthComponent} />
                <div className="bodyWrapper">
                    <Route path="/room" component={LeftNavBar} />
                    <Route exact path="/room" component={HelloWindow} />
                    <Route path="/room/:roomID" component={Calendar} />
                    <Route path="/allevents" component={Calendar} />
                    <Switch>
                        <Route path="/adminPanel" component={AdminPanel} />
                    </Switch>
                    <Route exact path="/" component={Footer}  />
                    <Route exact path="/adminPanel" component={HelloAdmin} />
                </div>
            </div>
        </BrowserRouter>
    </div>
);

export default connect()(App);