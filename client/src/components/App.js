import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Route } from 'react-router-dom';
import Header from './Header';
import LeftNavBar from './LeftNavBar';
import BigCalendar from './BigCalendar';
import HelloWindow from './HelloWindow';


class App extends Component {
    render() {
        return (
            <div className="App">
                <BrowserRouter>
                    <div>
                        <Header />
                        <LeftNavBar />
                        <Route path="/" exact component={HelloWindow} />
                        <Route path="/room/:roomID" component={BigCalendar} />
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;