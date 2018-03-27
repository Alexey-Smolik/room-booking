const express = require('express');
const app = express();
const models = require('./models');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const bodyParser = require('body-parser');
const path = require('path');
const logger = require('morgan');
const io = require('./sockets');
require('./config/main');

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(logger('dev'));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', require('./routes'));


models.sequelize.sync()
    .then(() => {
        const port = 8000;
        io.listen(port);
        app.listen(process.env.PORT, () => console.log(`Server is running on port ${process.env.PORT}\nSockets listening on port ${port}`));
    })
    .catch((err) => console.log(err));