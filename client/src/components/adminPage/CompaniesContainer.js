import React from 'react';
import { connect } from 'react-redux';
import { Button, ControlLabel , FormControl,Jumbotron } from 'react-bootstrap';
import CompanyItem from './CompanyItem'
import {
    createCompany,
    getCompanies,
} from '../../actions/index';

class CompaniesContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchValue: '',
            companyName: '',
            companyAddress: '',
            addFieldIsVisible: false,
        };
        this.props.dispatch(getCompanies());
    }
    addCompany(e) {
        const companyData = {
            name: this.state.companyName,
            address: this.state.companyAddress,

        };
        this.props.dispatch(createCompany(companyData));
        this.toggleAddCompanyField();
        e.preventDefault()
    }
    toggleAddCompanyField() {
        this.setState({
            addFieldIsVisible : !this.state.addFieldIsVisible,
            companyName: '',
            companyAddress: '',
        })
    }
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
    onSearchChange (e) {
        this.setState({
            searchValue: e.target.value,
        });
        e.preventDefault();
    };
    render() {
        let filteredCompanies = this.props.companies.filter((company) => {
            return company.name.toLowerCase().includes(this.state.searchValue.toLowerCase()) ||
                company.address.toLowerCase().includes(this.state.searchValue.toLowerCase())
        });
        return (
            <Jumbotron>
                { this.props.user.currentUser && this.props.user.currentUser.role === 1 ?
                        <div>
                            <h3>All companies</h3>
                            <div  style={{display:  'flex'}}>
                                    <FormControl onChange={(e) => this.onSearchChange(e)} value={this.state.searchValue}  type="search" placeholder="Search company" style = {{ width: "20%", marginRight: "10px" }}/>
                                    <Button
                                        type="button"
                                        bsStyle={this.state.addFieldIsVisible? 'warning': 'primary'}
                                        onClick={() => {this.toggleAddCompanyField()}}>
                                        {this.state.addFieldIsVisible ? 'Cancel': 'Add'}
                                    </Button>
                            </div>
                            <div>
                                <div style={{display:  'flex', justifyContent: 'space-around'}}>
                                <ControlLabel className="control-label" >Name</ControlLabel>
                                <ControlLabel className="control-label" >Address</ControlLabel>
                                </div>
                                <form onSubmit={(e) => {this.addCompany(e)}}  style={!this.state.addFieldIsVisible ? {display: "none"} :{display:"flex"}}>
                                    <FormControl className="form-control"   type="text" onChange={(e) => this.onCompanyNameChange(e)} value={this.state.companyName}  required />
                                    <FormControl className="form-control" type="text" onChange={(e) => this.onCompanyAddressChange(e)} value={this.state.companyAddress} required/>
                                    <Button type="submit"  bsStyle="success" >Save</Button>
                                </form>
                                {filteredCompanies.map( (company) => {
                                    return <CompanyItem
                                        name={company.name}
                                        address={company.address}
                                        id={company.id}
                                        key={company.id}
                                    />
                                }) }
                            </div>
                        </div>
                        : <div>
                            <h3>Your haven't permission to view this page</h3>
                        </div>
                }
            </Jumbotron>
        );
    }
}
function mapStateToProps ({user, companies}) {
    return {
        user,
        companies,
    }
}

export default connect(mapStateToProps)(CompaniesContainer);