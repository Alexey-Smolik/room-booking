import React, { Component } from 'react';
import { BrowserRouter, Route} from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions'

// Import components
import Header from './Header';
import LeftNavBar from './LeftNavBar';
import BookTable from './BookTable';
// import bookFrame from './bookFrame';


class App extends Component {

    componentDidMount() {

        console.log("APP",this.props);
        actions.getRooms();
    }

    BookTable(){
        return ( <BookTable room={this.props}/>);
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
                        <Route path="/room/:roomID"  component={BookTable} />
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