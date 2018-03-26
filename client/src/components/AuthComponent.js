import React from 'react';

const AuthComponent = () => {
    return(
        <div className="reactAuth">
            <form method="post" action="/auth/local" id="authForm">
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12 col-sm-12 col-lg-6" style={{marginLeft: "25%", marginTop: "15%"}}>
                            <div className="panel panel-primary">
                                <div className="panel-heading">
                                    <h3 className="panel-title">Sign in</h3>
                                </div>
                                <div className="panel-body">
                                    <div className="row">
                                        <div className="col-xs-6 col-sm-6 col-md-6 separator social-login-box"> <br />
                                            <br />
                                            <a href="/auth/vk" class="btn vk btn-block" role="button">Login with Vkontakte</a>
                                            <a href="/auth/fb" class="btn facebook btn-block" role="button">Login with Facebook</a>
                                            <a href="/auth/twitter" class="btn twitter btn-block" role="button">Login with Twitter</a>
                                            <a href="/auth/google" class="btn google btn-block" role="button">Login with Google</a>
                                        </div>
                                        <div className="col-xs-6 col-sm-6 col-md-6 login-box">
                                            <div role="form">
                                                <div className="input-group">
                                                    <span className="input-group-addon"><span className="glyphicon glyphicon-user"></span></span>
                                                    <input type="text" className="form-control" id="username" name="username" placeholder="username" required onInput={this.checkValue} />
                                                </div>
                                                <div className="input-group">
                                                    <span className="input-group-addon"><span className="glyphicon glyphicon-lock"></span></span>
                                                    <input type="password" className="form-control" id="password" name="password" placeholder="password" required onInput={this.checkValue} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="panel-footer">
                                    <div className="row">
                                        <div className="col-xs-12 col-sm-12 col-md-12">
                                            <button type="submit" /*class="btn btn-success"*/ id="login" style={{float: "right"}}> Sign in </button>
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
};

export default AuthComponent;