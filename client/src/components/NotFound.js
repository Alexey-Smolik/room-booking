import React from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import {
    getCurrentUser,
} from "../actions";

class NotFound extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.props.dispatch(getCurrentUser())
    }
    render() {
        return (

            <div className="body_404">
                {this.props.user && this.props.user.currentUser ?
                    <div>
                        <div>
                            <h1 className="p_404">404<br/>Incorrect URL address</h1>
                        </div>
                        <div className="container_for_404">
                            <Link className="link_404" to={'/room/'} >Home</Link>
                        </div>
                    </div>
                    :
                    this.props.user.hasError && <div>
                        <div>
                            <h1 className="p_404">404<br/>Authorize please</h1>
                        </div>
                        <div className="container_for_404">
                            <Link className="link_404" to={'/'} >Sign in</Link>
                        </div>
                    </div>
                }
            </div>
        );
    }
}


 const mapStateToProps =  ({user}) =>  {
    return {
        user
    }
};

export default connect(mapStateToProps)(NotFound);