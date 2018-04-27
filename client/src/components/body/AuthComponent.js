import React, { Component } from 'react';
import { userAuthForm } from '../../actions/index';
import { connect } from 'react-redux';
import {NotificationManager} from 'react-notifications';
import axios from 'axios';
import { Route, Redirect } from 'react-router'


class AuthComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      res: '',
        req: ''
    };
  }


  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };



    handleSubmit = (event) => {
        const  { username, password } = this.state;


        if(!username && !password) {
          event.preventDefault();
          this.createNotification('null fields')();
        }
        else if(!username) {
          event.preventDefault();
          this.createNotification('null username')();
        }
        else if(!password) {
          event.preventDefault();
          this.createNotification('null password')();
        } else {
            event.preventDefault();

            axios.post('/auth/local', { username, password } ).then( (req,res) => {
              this.props.history.push("/room");
            }).catch( () =>  this.createNotification('incorrect auth')())
        };
    };

    createNotification = (type) => {
        return () => {
            switch (type) {
                case 'null fields':
                    NotificationManager.error('Fill the fields!', 'Authorization', 3000);
                    break;
                case 'null username':
                    NotificationManager.error('Fill the username field!', 'Authorization', 3000);
                    break;
                case 'null password':
                    NotificationManager.error('Fill the password field!', 'Authorization', 3000);
                    break;
                case 'incorrect auth':
                    NotificationManager.error('Incorrect username and/or password', 'Authorization', 3000);
                    break;
            }
        };
    };

  render() {
    return (
      <div className="reactAuth">
        {/*<form method="post" action="/auth/local" id="authForm">*/}
        <form  id="authForm">
          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-sm-12 col-lg-6" >
              <div className="panel panel-primary">
                <div className="panel-heading">
                  <h3 className="panel-title">Sign in</h3>
                </div>
                <div className="panel-body">
                  <div className="row">
                    <div className="col-xs-6 col-sm-6 col-md-6 login-box">
                      <div className="cell">
                        <div className="input-group">
                          <input id="username" type="text" className="form-control" placeholder="username" name="username" value={this.state.username} onChange={this.handleChange} />
                        </div>
                        <div className="input-group">
                          <input id="password" type="password" className="form-control" placeholder="password" name="password" value={this.state.password} onChange={this.handleChange} />
                        </div>
                          <button className="login" type="submit" value="Sign in" onClick={this.handleSubmit}>Sign in</button>

                          <a className="anon_link" href='/auth/anonymus'>Anonymus log in</a>
                                <div className="login_with"><p>Login with: </p></div>
                                <div className="icons">
                                    <a href="/auth/vk" title="Login with VK"><img src={"/images/vk.svg"} alt="Login with vkontakte" /></a>
                                    <a href="/auth/google" title="Login with Google"><img src={"/images/google-plus.svg"} alt="Login with google" /></a>
                                    <a href="/auth/fb" title="Login with Facebook"><img src={"/images/facebook.svg"} alt="Login with facebook" /></a>
                                    <a href="auth/twitter" title="Login with Twitter"><img src={"/images/twitter.svg"} alt="Login with twitter" /></a>
                                    <a href="/auth/microsoft" title="Login with Microsoft"><img src={"/images/skype.svg"} alt="Login with microsoft" /></a>
                                </div>
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
