import React from 'react';
import { connect } from 'react-redux';
import {Jumbotron, Tab, Tabs } from 'react-bootstrap';
import Calendar from '../body/Calendar';
import IssuesContainer from './IssuesContainer';
import ImagesContainer from './ImagesContainer';
import EventsContainer from './EventsContainer';


class InnerRoomContainer extends React.Component {

    render() {
        let roomID = this.props.match.params.roomID;
        let roomName = this.props.rooms.map((room)=> {
           if(room.id === Number(roomID)) {
              return room.name
           }
        });
        return (
            <Jumbotron>
                {this.props.user.currentUser && this.props.user.currentUser.role === 1 ?
                    <div>
                        <h3>{roomName}</h3>
                        <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
                            <Tab eventKey={1} title="Events calendar">
                                <Calendar roomID = {roomID} />
                            </Tab>
                            <Tab eventKey={2} title="Photos">
                                <ImagesContainer  roomID={roomID}/>
                            </Tab>
                            <Tab eventKey={3} title="Issues" >
                                <IssuesContainer issues={this.props.issues} roomID={roomID}/>
                            </Tab>
                            <Tab eventKey={4} title="Events" >
                                <EventsContainer roomID={roomID}/>
                            </Tab>
                        </Tabs>
                    </div>
                    : <div>
                        <h3>Your haven't permission to view this page</h3>
                    </div>
                }
             </Jumbotron>
        );
    }
}
function mapStateToProps ({issues, user, rooms}) {
    return {
        issues,
        user,
        rooms
    }
}

export default connect(mapStateToProps)(InnerRoomContainer);