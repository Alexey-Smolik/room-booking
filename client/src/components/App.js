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
    this.props.getRooms();
  }

  render() {
    return (
      <div className="App">
         <BrowserRouter>
              <div>
                  <Header />
                  <LeftNavBar rooms={this.props.rooms} actions={actions}  />
                  <BookTable events={this.props.events} actions={actions}/>
              </div>
          </BrowserRouter>
      </div>
    );
  }
}

function mapStateToProps({rooms, events}) {
    return {
        rooms: rooms,
        events: events
    }
}


export default connect(mapStateToProps, actions)(App);
