import React , { Component } from 'react';
import JqxBarGauge from 'jqwidgets-react/react_jqxbargauge.js';

// import { connect } from 'react-redux';


class Header extends Component {
    componentDidMount () {
        this.refs.myScheduler.ensureAppointmentVisible('id1');
    }
    render () {
         return (
            <JqxBarGauge 
                width={600} height={600} max={150}
                colorScheme={'scheme02'} values={[102, 115, 130, 137]} 
            />
        )
    }
}
export default Header; 