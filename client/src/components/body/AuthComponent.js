import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {NotificationManager} from 'react-notifications';
import axios from 'axios';
import { PulseLoader } from 'react-spinners';

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
  componentWillReceiveProps(nextProps) {
      if(this.props.user.currentUser !== nextProps.user.currentUser) {
          (this.props.user.currentUser || nextProps.user.currentUser) &&  this.props.history.push("/room/all")
    }
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
              this.props.history.push("/room/all");
            }).catch( () =>  this.createNotification('incorrect auth')())
        }
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
          {this.props.user.hasError && !this.props.user.isLoaded ?
              <form id="authForm">
                  <div className="container">
                      <div className="row">
                          <div className="col-xs-12 col-sm-12 col-lg-6">
                              <div className="panel panel-primary">
                                  <div className="panel-heading">
                                      <h3 className="panel-title">Sign in</h3>
                                  </div>
                                  <div className="panel-body">
                                      <div className="row">
                                          <div className="col-xs-6 col-sm-6 col-md-6 login-box">
                                              <div className="cell">
                                                  <div className="input-group">
                                                      <input id="username" type="text" className="form-control"
                                                             placeholder="username" name="username"
                                                             value={this.state.username} onChange={this.handleChange}/>
                                                  </div>
                                                  <div className="input-group">
                                                      <input id="password" type="password" className="form-control"
                                                             placeholder="password" name="password"
                                                             value={this.state.password} onChange={this.handleChange}/>
                                                  </div>
                                                  <button className="login" type="submit" value="Sign in"
                                                          onClick={this.handleSubmit}>Sign in
                                                  </button>

                                                  <a className="anon_link" href='/auth/anonymus'>Anonymus log in</a>
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </form>
              : <div style={{position: "absolute", top:"50%", left: "50%"}}>
                  <PulseLoader
                  color={'#d32f2f'}
                  loading={true}
                  />
              </div>
          }
      </div>
    );
  }
}

export default withRouter(AuthComponent);
