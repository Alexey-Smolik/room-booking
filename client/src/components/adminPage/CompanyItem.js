import React from 'react';
import { Button, FormGroup , ControlLabel , FormControl,Jumbotron } from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router'
import {
    updateCompany,
    deleteCompany,
    getCompanies
} from '../../actions/index'

class CompanyItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            btnText: 'Edit',
            companyName: this.props.name,
            companyAddress: this.props.address,
            isFieldEditing: false,
        };
    }

    changeCompanyData = (e,id) => {
        this.setState({
            btnText: 'Cancel',
            isFieldEditing: true,
        });
        const companyData = {
            id: id,
            name: this.state.companyName,
            address: this.state.companyAddress,
        };
        if(this.state.btnText === 'Save') {
            this.props.dispatch(updateCompany(companyData,id));
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

    onCompanyAddressChange (e) {
        this.setState({
            companyAddress: e.target.value,
            btnText: 'Save'

        });
        e.preventDefault();
    };
    onCompanyNameChange (e) {
        this.setState({
            companyName: e.target.value,
            btnText: 'Save'
        });
        e.preventDefault();
    };

    render() {
        const {id} = this.props;
        const { isFieldEditing, btnText} = this.state;
        return (
            <form onSubmit={(e)=> {this.changeCompanyData(e,id)}} style={{display:  'flex'}}>
                <FormControl type="text" onChange={(e) => this.onCompanyNameChange(e)} value={this.state.companyName} disabled={!isFieldEditing} required/>
                <FormControl type="text" onChange={(e) => this.onCompanyAddressChange(e)} value={this.state.companyAddress} disabled={!isFieldEditing} required/>
                <Button type="submit" bsStyle={isFieldEditing? 'success': 'primary'}>{btnText}</Button>
                <Button type="button" bsStyle='danger' onClick={() => {
                    this.props.dispatch(deleteCompany(this.props.id));
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

export default connect(mapStateToProps)(CompanyItem);