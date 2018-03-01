import React, { Component } from 'react';
import { BrowserRouter, Route} from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions'

// Import components
import Header from './Header';
import LeftNavBar from './LeftNavBar';
import BookTable from './BookTable';


class App extends Component {

  componentDidMount() {
    this.props.getRoom(1);
    console.log(this.props);
    console.log("componentDidMount APP");

  }

  render() {
    return (
      <div className="App">
         <BrowserRouter>
              <div>
                  <Header />
                  <LeftNavBar getRooms={this.props.getRooms} />
                  <Route exact path="/:roomID" component={BookTable} />
              </div>
          </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions)(App);
