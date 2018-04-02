import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import TopNavBar from './header/NavBar';
import LeftNavBar from './body/LeftNavBar';
import Calendar from './body/Calendar';
import HelloWindow from './body/HelloWindow';
import AuthComponent from './body/AuthComponent';
import Footer from './Footer/Footer';


const App = () => (
  <div className="App">
    <BrowserRouter>
      <div>
        <TopNavBar />
        <Route exact path="/" component={AuthComponent} />
          <div className="bodyWrapper">
              <Route path="/room" component={LeftNavBar} />
              <Route exact path="/room" component={HelloWindow} />
              <Route path="/room/:roomID" component={Calendar} />
          </div>
        <Footer />
      </div>
    </BrowserRouter>
  </div>
);

export default connect()(App);
