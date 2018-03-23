import React from 'react';
import TopEventSearch from './TopEventSearch';
import TopHeader from './TopHeader';
import { getCurrentUser } from "../actions";
import {connect} from "react-redux";

class TopNavBar extends React.Component {


    componentDidMount() {
        this.props.dispatch(getCurrentUser());
    }


    render() {
        console.log(this.props)
        return (
            <div className="reactHeader">
                <TopEventSearch user={this.props.user}/>
                <TopHeader/>
            </div>
        );
    }
};

function mapStateToProps({ user }) {
    return {
        user: user
    };
}

export default connect(mapStateToProps)(TopNavBar);