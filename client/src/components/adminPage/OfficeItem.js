import React from 'react';
import { Button, FormControl } from 'react-bootstrap';
import { connect } from 'react-redux';
import {
    updateOffice,
    deleteOffice,
} from '../../actions/index'

class OfficeItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            btnText: 'Edit',
            officeName: this.props.name,
            officeAddress: this.props.address,
            isFieldEditing: false,
        };
    }

    changeOfficeData = (e,id) => {
        this.setState({
            btnText: 'Cancel',
            isFieldEditing: true,
        });
        const officeData = {
            id: id,
            name: this.state.officeName,
            address: this.state.officeAddress,
        };
        if(this.state.btnText === 'Save') {
            this.props.dispatch(updateOffice(officeData,id));
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
    };

    onOfficeAddressChange (e) {
        this.setState({
            officeAddress: e.target.value,
            btnText: 'Save'

        });
        e.preventDefault();
    };
    onOfficeNameChange (e) {
        this.setState({
            officeName: e.target.value,
            btnText: 'Save'
        });
        e.preventDefault();
    };

    render() {
        const {id} = this.props;
        const { isFieldEditing, btnText} = this.state;
        return (
            <form onSubmit={(e)=> {this.changeOfficeData(e,id)}} style={{display:  'flex'}}>
                <FormControl type="text" onChange={(e) => this.onOfficeNameChange(e)} value={this.state.officeName} disabled={!isFieldEditing} required/>
                <FormControl type="text" onChange={(e) => this.onOfficeAddressChange(e)} value={this.state.officeAddress} disabled={!isFieldEditing} required/>
                <Button type="submit" bsStyle={isFieldEditing? 'success': 'primary'}>{btnText}</Button>
                <Button type="button" bsStyle='danger' onClick={() => {
                    this.props.dispatch(deleteOffice(this.props.id));
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
function mapStateToProps ({user}) {
    return {
        user
    }
}

export default connect(mapStateToProps)(OfficeItem);