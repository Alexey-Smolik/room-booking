import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Route } from 'react-router-dom';
import Header from './Header';
import LeftNavBar from './LeftNavBar';
import Calendar from './Calendar';
import HelloWindow from './HelloWindow';
import AuthComponent from './AuthComponent';
import Image from './Image';
import EventsFilter from './EventsFilter';

// {<Route path="/helloWindow"  component={HelloWindow} />}

class App extends Component {
    render() {
        return (
            <div className="App">
                <BrowserRouter>
                    <div>
                        <Image />
                        <Header />
                        <EventsFilter />
                        <Route exact path="/"  component={AuthComponent} />
                        <Route path="/room"  component={LeftNavBar} />
                        <Route excat path="/room"  component={HelloWindow} />
                        <Route path="/room/:roomID"  component={Calendar} />
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;