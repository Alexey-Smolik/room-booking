import React from 'react';
import { connect } from 'react-redux';
import Header from './header/Header';
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
                <Header/>
                {this.props.user && this.props.user.currentUser ?
                    <div>
                        <div>
                            <h1 className="p_404">404<br/>Incorrect URL address</h1>
                        </div>
                        <div className="container_for_404">
                            <Link className="link_404" to={'/room/'} title="Go home">Home</Link>
                        </div>
                    </div>
                    :
                    this.props.user.hasError && <div>
                        <div>
                            <h1 className="p_404">404<br/>Go to auth</h1>
                        </div>
                        <div className="container_for_404">
                            <Link className="link_404" to={'/'} title="Go auth">Auth</Link>
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