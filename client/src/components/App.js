import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { NotificationContainer } from 'react-notifications';
import NavBar from './header/NavBar';
import LeftNavBar from './body/LeftNavBar';
import Calendar from './body/Calendar';
import AuthComponent from './body/AuthComponent';
import Footer from './Footer/Footer';
import AdminPanel from './AdminPanel';
import NotFound from './NotFound';
import { connect } from "react-redux";

class App extends React.Component {
    render() {

        return (
            <div className="App">
                <BrowserRouter>
                    <div>
                        <Route path="/room" component={NavBar}/>
                        <Route exact path="/" render={() => <AuthComponent isAuthenticated={this.props.user.isAuthenticated}/>}/>
                        <div className="bodyWrapper">
                            <Route path="/room" component={LeftNavBar}/>
                            <Switch>
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
