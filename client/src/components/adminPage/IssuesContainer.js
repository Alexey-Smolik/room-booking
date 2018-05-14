import React from 'react';
import { connect } from 'react-redux';
import { Button, ControlLabel , FormControl } from 'react-bootstrap';
import IssueItem from './IssueItem'
import {
    createIssue,
    getAllIssues,
    getRoomIssues,
    getRooms,
} from '../../actions/index';

class IssuesContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            description: '',
            roomName: '',
            searchValue: '',
            addFieldIsVisible: false,
        };
    }

    getIssues() {
        if(this.props.roomID) {
            this.props.dispatch(getRoomIssues(this.props.roomID))
        } else {
            this.props.dispatch(getAllIssues());
        }
    }
    componentDidMount() {
        this.props.dispatch(getRooms());
        this.getIssues();
    }
    addIssue(e) {
        let roomID = null;
        let roomName = '';
        if(this.props.roomID) {
            roomID = this.props.roomID;
            this.props.rooms.forEach((room) => {
                if(room.id === Number(roomID) ) {
                    roomName = room.name;
                }
            });
        } else {
            this.props.rooms.forEach((room) => {
                if(room.name === this.state.roomName ) {
                    roomID = room.id;
                    roomName = room.name;
                }
            });
        }

        const issueData = {
            description: this.state.description,
            active: true,
            roomId: roomID,
            roomName: roomName
        };
        this.props.dispatch(createIssue(issueData));
        this.toggleAddIssueField();
        e.preventDefault();
    };
    toggleAddIssueField() {
        this.setState({
            addFieldIsVisible : !this.state.addFieldIsVisible,
            searchValue: '',
            description: '',
            roomName: ''
        })
    }
    onDescriptionChange(e) {
        this.setState({
            description: e.target.value,
        });
        e.preventDefault();
    };
    onRoomNameChange(e) {
        this.setState({
            roomName: e.target.value,
        });
        e.preventDefault();
    };
    onSearchChange(e) {
        this.setState({
            searchValue: e.target.value,
        });
        e.preventDefault();
    };
    render() {
        let filteredIssues = this.props.issues && this.props.issues.filter((issue) => {
            issue.active ? issue.status = 'active' : issue.status = 'inactive';
            if(issue.room) {
                return issue.description.toLowerCase().includes(this.state.searchValue.toLowerCase()) ||
                    issue.room.name.toLowerCase().includes(this.state.searchValue.toLowerCase()) ||
                    !issue.status.toLowerCase().indexOf(this.state.searchValue.toLowerCase())
            } else {
                return issue.description.toLowerCase().includes(this.state.searchValue.toLowerCase()) ||
                    issue.roomName.toLowerCase().includes(this.state.searchValue.toLowerCase()) ||
                    !issue.status.toLowerCase().indexOf(this.state.searchValue.toLowerCase())
            }
        });
        return (
            <div>
                { this.props.user && this.props.user.currentUser && this.props.user.currentUser.role === 1 ?
                    <div>
                        {!this.props.roomID && <h3>All issues</h3>}
                        <div  className = "add1" style={!this.props.issues.length ? {justifyContent: "flex-end"}: {}}>
                            {!!this.props.issues.length && <FormControl onChange={(e) => this.onSearchChange(e)} value={this.state.searchValue}  type="search" placeholder="Issue search" style = {{ width: "25%"}}/>}
                            <Button
                                type="button"
                                bsStyle={this.state.addFieldIsVisible? 'warning': 'primary'}
                                onClick={() => {this.toggleAddIssueField()}}>
                                {this.state.addFieldIsVisible ? 'Cancel': 'Add'}
                            </Button>
                        </div>
                        <div>
                            {(!!this.props.issues.length || this.state.addFieldIsVisible) && <div style={{display:  'flex', justifyContent: 'space-between'}}>
                                <ControlLabel className="control-label" >Description</ControlLabel>
                                { !this.props.roomID && <ControlLabel className="control-label" >Room name</ControlLabel>}
                                { !this.state.addFieldIsVisible  && <ControlLabel className="control-label" >Status</ControlLabel>}
                            </div>}
                            <form onSubmit={(e) => {this.addIssue(e)}} style={!this.state.addFieldIsVisible ? {display: "none"} :{display:"flex"}}>
                                <FormControl className="form-control"   type="text" onChange={(e) => this.onDescriptionChange(e)} value={this.state.description}  required />
                                { !this.props.roomID && <FormControl componentClass="select"  onChange={(e) => this.onRoomNameChange(e)}  value={this.state.roomName} required>
                                    <option  defaultValue/>
                                    {this.props.rooms.map((room) => {
                                        return <option value={room.name} key={room.id}>{room.name}</option>
                                    })}
                                </FormControl>}
                                <Button type="submit" bsStyle="success" >Save</Button>
                            </form>
                            { filteredIssues && filteredIssues.map( (issue) => {
                                if(issue.room) {
                                    return <IssueItem
                                        description={issue.description}
                                        roomName={issue.room.name}
                                        roomID = {this.props.roomID}
                                        active={issue.active}
                                        rooms={this.props.rooms}
                                        key={issue.id}
                                        id={issue.id}
                                    />
                                } else {
                                    return <IssueItem
                                        description={issue.description}
                                        roomName={issue.roomName}
                                        roomID = {this.props.roomID}
                                        active={issue.active}
                                        rooms={this.props.rooms}
                                        key={issue.id}
                                        id={issue.id}
                                    />
                                }
                            }) }
                        </div>
                    </div>
                    : <div>
                        <h3>Your haven't permission to view this page</h3>
                    </div>
                }
            </div>
        );
    }
}
function mapStateToProps ({user, rooms}) {
    return {
        user,
        rooms
    }
}

export default connect(mapStateToProps)(IssuesContainer);