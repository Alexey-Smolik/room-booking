import React from 'react';
import { connect } from 'react-redux';
import { Button, ControlLabel , FormControl,Jumbotron } from 'react-bootstrap';
import OfficesItem from './OfficeItem'
import {
    createOffice,
    getOffices,
} from '../../actions/index';

class OfficesContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchValue: '',
            officeName: '',
            officeAddress: '',
            addFieldIsVisible: false,
        };
        this.props.dispatch(getOffices());
    }
    addOffice(e) {
        const officeData = {
            name: this.state.officeName,
            address: this.state.officeAddress,

        };
        this.props.dispatch(createOffice(officeData));
        this.toggleAddOfficeField();
        e.preventDefault()
    }
    toggleAddOfficeField() {
        this.setState({
            addFieldIsVisible : !this.state.addFieldIsVisible,
            officeName: '',
            officeAddress: '',
        })
    }
    onOfficeAddressChange (e) {
        this.setState({
            officeAddress: e.target.value,
        });
        e.preventDefault();
    };
    onOfficeNameChange (e) {
        this.setState({
            officeName: e.target.value,
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
        let filteredOffices = this.props.offices.filter((office) => {
            return office.name.toLowerCase().includes(this.state.searchValue.toLowerCase()) ||
                office.address.toLowerCase().includes(this.state.searchValue.toLowerCase())
        });
        return (
            <Jumbotron>
                { this.props.user.currentUser && this.props.user.currentUser.role === 1 ?
                        <div>
                            <h3>All offices</h3>
                            <div  className="add1" style={!this.props.offices.length ? {justifyContent: "flex-end"}: {}} >
                                {!!this.props.offices.length && <FormControl onChange={(e) => this.onSearchChange(e)} value={this.state.searchValue}  type="search" placeholder="Search office" style = {{ width: "20%" }}/>}
                                    <Button
                                        type="button"
                                        bsStyle={this.state.addFieldIsVisible? 'warning': 'primary'}
                                        onClick={() => {this.toggleAddOfficeField()}}>
                                        {this.state.addFieldIsVisible ? 'Cancel': 'Add'}
                                    </Button>
                            </div>
                            <div>
                                {(!!this.props.offices.length || this.state.addFieldIsVisible) && <div style={{display:  'flex', justifyContent: 'space-around'}}>
                                    <ControlLabel className="control-label" >Name</ControlLabel>
                                    <ControlLabel className="control-label" >Address</ControlLabel>
                                </div>}
                                <form onSubmit={(e) => {this.addOffice(e)}}  style={!this.state.addFieldIsVisible ? {display: "none"} :{display:"flex"}}>
                                    <FormControl className="form-control" type="text" onChange={(e) => this.onOfficeNameChange(e)} value={this.state.officeName}  required />
                                    <FormControl className="form-control" type="text" onChange={(e) => this.onOfficeAddressChange(e)} value={this.state.officeAddress} required/>
                                    <Button type="submit"  bsStyle="success" >Save</Button>
                                </form>
                                {filteredOffices.map( (office) => {
                                    return <OfficesItem
                                        name={office.name}
                                        address={office.address}
                                        id={office.id}
                                        key={office.id}
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
function mapStateToProps ({user, offices}) {
    return {
        user,
        offices,
    }
}

export default connect(mapStateToProps)(OfficesContainer);