import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Route } from 'react-router-dom';
import TopNavBar from './TopNavBar';
import LeftNavBar from './LeftNavBar';
import Calendar from './Calendar';
import HelloWindow from './HelloWindow';
import AuthComponent from './AuthComponent';
import {getCurrentUser} from "../actions";
import {connect} from 'react-redux';

class App extends Component {


    componentDidMount() {
        this.props.dispatch(getCurrentUser());
        console.log(this.props);
    }


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
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}

export default connect(null, null)(App);