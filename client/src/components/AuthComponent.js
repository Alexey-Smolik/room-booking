import React, { Component } from 'react';
import { userAuthForm } from '../actions';
import { connect } from 'react-redux';


class AuthComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }


  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    let {username, password} = this.state;
    { username && password &&  this.props.dispatch(userAuthForm()) }
  }


  render() {
    return (
      <div className="reactAuth">
        <form method="post" action="/auth/local" id="authForm">
          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-sm-12 col-lg-6" >
              <div className="panel panel-primary">
                <div className="panel-heading">
                  <h3 className="panel-title">Sign in</h3>
                </div>
                <div className="panel-body">
                  <div className="row">
                    <div className="col-xs-6 col-sm-6 col-md-6 separator social-login-box">
                      <a href="/auth/vk" className="btn vk btn-block" role="button">Login with Vkontakte</a>
                      <a href="/auth/fb" className="btn facebook btn-block" role="button">Login with Facebook</a>
                      <a href="/auth/twitter" className="btn twitter btn-block" role="button">Login with Twitter</a>
                      <a href="/auth/google" className="btn google btn-block" role="button">Login with Google</a>
                    </div>
                    <div className="col-xs-6 col-sm-6 col-md-6 login-box">
                      <div onSubmit={this.handleSubmit}>
                        <div className="input-group">
                          <span className="input-group-addon"><span className="glyphicon glyphicon-user" /></span>
                          <input id="username" type="text" className="form-control" placeholder="username" name="username" value={this.state.username} onChange={this.handleChange} />
                        </div>
                        <div className="input-group">
                          <span className="input-group-addon"><span className="glyphicon glyphicon-lock" /></span>
                          <input id="password" type="password" className="form-control" placeholder="password" name="password" value={this.state.password} onChange={this.handleChange} />
                        </div>
                        <input className="login" type="submit" value="Sign in" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}


export default connect()(AuthComponent);
