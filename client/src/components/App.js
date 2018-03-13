import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';


// Import components
import Header from './Header';
import LeftNavBar from './LeftNavBar';
import BookTable from './BookTable';
import BigCalendar from './BigCalendar';



class App extends Component {

    componentWillMount() {
        actions.getRooms();
        console.log("APP",this.props);
    }



    render() {
        return (
            <div className="App">
                <BrowserRouter>
                    <div>
                        <Header />
                        <LeftNavBar rooms={this.props.rooms}   />
                        {/*<BookTable room={this.props.events} />*/}
                        {/*<Route path="/room/:roomID" component={bookFrame} />*/}
                        {/*<Route path="/room/:roomID"  component={BookTable} />*/}
                        <BigCalendar/>
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}

function mapStateToProps({rooms}) {
    return {
        rooms: rooms
    }
}


export default connect(mapStateToProps, actions)(App);