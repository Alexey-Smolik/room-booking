import React from 'react';
import { Button, FormControl, Label} from 'react-bootstrap';
import { connect } from 'react-redux';
import {
    updateIssue,
    deleteIssue,
} from '../../actions/index'

class IssueItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            description: this.props.description,
            roomName: this.props.roomName,
            active: this.props.active,
            isFieldEditing: false,
            btnText: 'Edit',
        };
    }

    changeIssueStatus (e,id) {
        this.setState({
            active: !this.state.active
        });
        if(this.state.isFieldEditing)  {
            this.setState({
                btnText: 'Save'
            })
        }
        let issueData ={
            id: id,
            description: this.state.description,
            roomName: this.props.roomName,
            active: !this.state.active,
        };
        if(this.state.btnText === 'Edit') {
            this.props.dispatch(updateIssue(id, issueData));
        }
    };

    onIssueDescriptionChange (e) {
        this.setState({
            description: e.target.value,
            btnText: 'Save'
        });
        e.preventDefault();
    };

    changeIssueData (e,id) {
        this.setState({
            btnText: 'Cancel',
            isFieldEditing: true,
        });
        const issueData = {
            id: id,
            description: this.state.description,
            roomName: this.props.roomName,
            active: this.state.active,
        };
        if(this.state.btnText === 'Save') {
            this.props.dispatch(updateIssue(id,issueData));
            this.setState({
                btnText: 'Edit',
                isFieldEditing: false,
            });
        } else if(this.state.btnText === 'Cancel') {
            this.setState({
                btnText: 'Edit',
                isFieldEditing: false,
            });
        }
        e.preventDefault()
    }

    render() {
        const {id, roomID} = this.props;
        const { description, roomName, active, isFieldEditing, btnText} = this.state;
        return (
            <form onSubmit={(e)=> {this.changeIssueData(e,id)}} style={{display:  'flex'}}>
                <FormControl  type="text" value={description} onChange={(e) => this.onIssueDescriptionChange(e)} disabled={!isFieldEditing} required/>
                { !roomID && <FormControl  type="text" value={roomName}  disabled/>}
                <Label bsStyle={!active ? "danger" : "success"}   onClick={(e)=> {this.changeIssueStatus(e,id)}}>{active ? "active" : "inactive"}</Label>
                <Button type="submit" bsStyle={isFieldEditing? 'success': 'primary'}>{btnText}</Button>
                <Button type="button" bsStyle='danger' onClick={() => {
                    this.props.dispatch(deleteIssue(id));
                    this.setState({
                        isFieldEditing: false,
                        btnText: 'Edit'})
                    ;}}
                        style={!isFieldEditing ? {display: "none"} : {}}  aria-label="Delete">Delete
                </Button>
            </form>

        );
    }
}

export default connect(null)(IssueItem);