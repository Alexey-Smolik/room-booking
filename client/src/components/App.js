import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import TopNavBar from './header/TopNavBar';
import LeftNavBar from './LeftNavBar';
import Calendar from './Calendar';
import HelloWindow from './HelloWindow';
import AuthComponent from './AuthComponent';
import Footer from './Footer';
import AdminPanel from './AdminPanel';


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
              <Route path="/adminPanel" component={AdminPanel} />
          </div>
        <Footer />
      </div>
    </BrowserRouter>
  </div>
);

export default connect()(App);
