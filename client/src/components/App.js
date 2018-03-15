/*import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Route } from 'react-router-dom';
import Header from './Header';
import LeftNavBar from './LeftNavBar';
import Calendar from './Calendar';
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
                        <Route path="/room/:roomID" component={Calendar} />
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;*/

import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Route } from 'react-router-dom';
import Header from './Header';
import LeftNavBar from './LeftNavBar';
import Calendar from './Calendar';
import HelloWindow from './HelloWindow';

class App extends Component {
    render() {
        return (
            <div className="App">
                <BrowserRouter>
                    <div>
                        <Header />
                        <LeftNavBar rooms={this.props.rooms}   />
                        <Route path="/" exact component={HelloWindow} />
                        <Route path="/room/:roomID"  component={Calendar} />

                    </div>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;