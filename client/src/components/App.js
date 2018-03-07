import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';


// Import components
import Header from './Header';
import LeftNavBar from './LeftNavBar';
import BookTable from './BookTable';


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
                        <Header name={this.props} />
                        <LeftNavBar rooms={this.props.rooms}   />
                        <br/>
                        {/*<BookTable room={this.props.events} />*/}
                        {/*<Route path="/room/:roomID" component={bookFrame} />*/}
                        {/*<Route path="/room/:roomID"  component={BookTable} />*/}
                        <BookTable/>
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}

function mapStateToProps({rooms, user}) {
    return {
        rooms: rooms,
        user: user
    }
}


export default connect(mapStateToProps, actions)(App);