import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { NotificationContainer } from 'react-notifications';
import NavBar from './header/NavBar';
import LeftNavBar from './body/LeftNavBar';
import Calendar from './body/Calendar';
import HelloWindow from './body/HelloWindow';
import AuthComponent from './body/AuthComponent';
import Footer from './Footer/Footer';
import AdminPanel from './AdminPanel';
import NotFound from './NotFound';
import { connect } from "react-redux";
import {getCurrentUser} from "../actions";

class App extends React.Component {
    componentDidMount() {
        this.props.dispatch(getCurrentUser())
    }
    render() {
        return (
            <div className="App">
                <BrowserRouter>
                    <div>
                        <Route path="/room" component={NavBar}/>
                        <Route exact path="/" render={() => <AuthComponent user={this.props.user}/>}/>
                        <div className="bodyWrapper">
                            <Route path="/room" component={LeftNavBar}/>
                            <Switch>
                                <Route exact path="/room" component={HelloWindow}/>
                                <Route path="/room/:roomID" component={Calendar}/>
                                <Route exact path="/" component={Footer}/>
                                <Route path="/adminPanel" component={AdminPanel}/>
                                <Route path="*" component={NotFound}/>
                            </Switch>
                        </div>
                    </div>
                </BrowserRouter>
                <NotificationContainer/>
            </div>
        )
    }
}
const mapStateToProps = ({user}) => ({
    user
});
export default connect(mapStateToProps)(App);
