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
            btnText: 'Save',
            isFieldEditing: true,
        });
        const companyData = {
            name: this.state.companyName,
            address: this.state.companyAddress,
        };
        if(this.state.btnText === 'Save') {
            this.props.dispatch(updateCompany(companyData,id));
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
        });
        e.preventDefault();
    };
    onCompanyNameChange (e) {
        this.setState({
            companyName: e.target.value,
        });
        e.preventDefault();
    };

    render() {
        const {id} = this.props;
        const { isFieldEditing, btnText} = this.state;
        return (
            <div style={{display:  'flex', paddingBottom: '15px'}}>
                <FormControl  type="text" value={this.state.companyName} onChange={(e) => this.onCompanyNameChange(e)}  disabled={!isFieldEditing}/>
                <FormControl  type="text" value={this.state.companyAddress} onChange={(e) => this.onCompanyAddressChange(e)}   disabled={!isFieldEditing}/>
                <Button type="submit" bsStyle={isFieldEditing? 'success': 'primary'} onClick={(e)=> {this.changeCompanyData(e,id)}} >{btnText}</Button>
                <Button type="button" bsStyle='danger' onClick={() => {
                    this.props.dispatch(deleteCompany(this.props.id));
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
function mapStateToProps ({user}) {
    return {
        user: user
    }
}

export default connect(mapStateToProps)(CompanyItem);