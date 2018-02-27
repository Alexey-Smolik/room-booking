import React, { Component } from 'react';
import $ from 'jquery'
import JqxMenu, { jqx } from './assets/jqwidgets-react/react_jqxbargauge.js';

class App extends React.Component {
    render () {
      return (
   
        <JqxMenu 
           width={600} height={600} colorScheme={'scheme02'} 
           max={150} values={[102, 115, 130, 137]} 
        />
   
      )
    }
  }
 

export default App;