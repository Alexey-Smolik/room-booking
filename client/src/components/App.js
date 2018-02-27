import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Header from './Header';
import LeftNavBar from './LeftNavBar';
import BookTable from './BookTable';
import SecondPage from './SecondPage';
 

class App extends Component {
  render() {
    return (
      <div className="App">
         <BrowserRouter>
              <div>
                  <Header />
                  <LeftNavBar />
                  <BookTable />
                  {/* <Route exact path="/booktable" component={BookTable} /> */}
                  <Route exact path="/secondpage" component={SecondPage} /> 
              </div>
          </BrowserRouter>
      </div>
    );
  }
}

export default App;
