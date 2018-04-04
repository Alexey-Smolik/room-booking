import React from 'react';
import { Button, FormControl, Label} from 'react-bootstrap';
import { connect } from 'react-redux';
import {
    updateIssue,
    deleteIssue,
} from '../../actions/index'

class CompanyItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            description: this.props.description,
            active: this.props.active,
            isFieldEditing: false,
            btnText: 'Edit',
        };
    }

    changeIssueStatus (e,id) {
        this.setState({
            active: !this.state.active
        });
        let issueData ={
            id: id,
            description: this.state.description,
            roomName: this.props.roomName,
            active: !this.state.active,
        };
        this.props.dispatch(updateIssue(id, issueData));
    };

    onIssueDescriptionChange (e) {
        this.setState({
            description: e.target.value,
        });
        e.preventDefault();
    };

    changeIssueData (e,id) {
        this.setState({
            btnText: 'Save',
            isFieldEditing: true,
        });
        const issueData = {
            id: id,
            description: this.state.description,
            roomName: this.props.roomName,
        };
        if(this.state.btnText === 'Save') {
            this.props.dispatch(updateIssue(id,issueData));
            this.setState({
                btnText: 'Edit',
                isFieldEditing: false,
            });
        }
        e.preventDefault()
    }

    render() {
        const {id,roomName, roomID} = this.props;
        const { description, active, isFieldEditing, btnText} = this.state;
        return (
            <div style={{display:  'flex', paddingBottom: '15px'}}>
                <FormControl  type="text" value={description} onChange={(e) => this.onIssueDescriptionChange(e)} disabled={!isFieldEditing}/>
                { !roomID && <FormControl  type="text" value={roomName}   disabled/>}
                <Label bsStyle={!active ? "danger" : "success"}   onClick={(e)=> {this.changeIssueStatus(e,id)}}>{active ? "active" : "inactive"}</Label>
                <Button type="submit" bsStyle={isFieldEditing? 'success': 'primary'} onClick={(e)=> {this.changeIssueData(e,id)}} >{btnText}</Button>
                <Button type="button" bsStyle='danger' onClick={() => {
                    this.props.dispatch(deleteIssue(id));
                    this.setState({
                        isFieldEditing: false,
                        btnText: 'Edit'})
                    ;}}
                        style={!isFieldEditing ? {display: "none"} : {}}  aria-label="Delete">
                    <span aria-hidden="true">&times;</span>
                </Button>
            </div>

        );
    }
}

export default connect(null)(CompanyItem);