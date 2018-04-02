import React from 'react';
import { connect } from 'react-redux';
import {Jumbotron, Tab, Tabs } from 'react-bootstrap';
import Calendar from '../body/Calendar';
import IssuesContainer from './IssuesContainer';
import ImagesContainer from './ImagesContainer';


class InnerRoomContainer extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {

        let roomID = this.props.match.params.roomID;
        return (
                <Jumbotron>
                    <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
                        <Tab eventKey={1} title="Events calendar">
                            <Calendar roomID = {roomID}/>
                        </Tab>
                        <Tab eventKey={2} title="Photos">
                            <ImagesContainer  roomID={roomID}/>
                        </Tab>
                        <Tab eventKey={3} title="Issues" >
                            <IssuesContainer issues={this.props.issues} roomID={roomID}/>
                        </Tab>
                    </Tabs>
                </Jumbotron>

        );
    }
}
function mapStateToProps ({issues}) {
    return {
        issues: issues,
    }
}

export default connect(mapStateToProps)(InnerRoomContainer);