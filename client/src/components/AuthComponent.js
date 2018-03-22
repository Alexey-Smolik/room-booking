import React from 'react';

const AuthComponent = () => {
    return(
        <div className="reactAuth">
            <form method="post" action="/auth/local" id="authForm">
                <div class="container">
                    <div class="row">
                        <div class="col-xs-12 col-sm-12 col-lg-6" style={{marginLeft: "25%", marginTop: "15%"}}>
                            <div class="panel panel-primary">
                                <div class="panel-heading">
                                    <h3 class="panel-title">Sign in</h3>
                                </div>
                                <div class="panel-body">
                                    <div class="row">
                                        <div class="col-xs-6 col-sm-6 col-md-6 separator social-login-box"> <br />
                                            <br />
                                            <a href="/auth/vk" class="btn vk btn-block" role="button">Login with Vkontakte</a>
                                            <a href="/auth/fb" class="btn facebook btn-block" role="button">Login with Facebook</a>
                                            <a href="/auth/twitter" class="btn twitter btn-block" role="button">Login with Twitter</a>
                                            <a href="/auth/google" class="btn google btn-block" role="button">Login with Google</a>
                                        </div>
                                        <div class="col-xs-6 col-sm-6 col-md-6 login-box">
                                            <form role="form">
                                                <div class="input-group">
                                                    <span class="input-group-addon"><span class="glyphicon glyphicon-user"></span></span>
                                                    <input type="text" class="form-control" id="username" name="username" placeholder="username" required autofocus oninput="checkValue()" />
                                                </div>
                                                <div class="input-group">
                                                    <span class="input-group-addon"><span class="glyphicon glyphicon-lock"></span></span>
                                                    <input type="password" class="form-control" id="password" name="password" placeholder="password" required oninput="checkValue()" />
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                <div class="panel-footer">
                                    <div class="row">
                                        <div class="col-xs-12 col-sm-12 col-md-12">
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