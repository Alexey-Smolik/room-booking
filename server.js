const express = require('express');
const app = express();
const models = require('./models');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const bodyParser = require('body-parser');
const logger = require('morgan');
const pgSession = require('connect-pg-simple')(session);
const io = require('./sockets');
const config = require('./config/main');

// MIDDLEWARE FOR COOKIE AND BODY PARSER
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// MIDDLEWARE FOR SESSION STORAGE
app.use(session({
    store: new pgSession({
        conString : `${config.db.driver}://${config.db.user}:${config.db.password}@${config.db.host}:${config.db.port}/${config.db.database}`
    }),
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 } // 30 days
}));

// MIDDLEWARE FOR LOGGING REQUEST
app.use(logger('dev'));

// MIDDLEWARE FOR PASSPORT.JS
app.use(passport.initialize());
app.use(passport.session());

// MIDDLEWARE FOR REQUEST
app.use('/', require('./routes'));

// SYNCHRONIZATION WITH DATABASE AND RUNNING SERVER
models.sequelize.sync()
    .then(() => {
        const port = 8000;
        io.listen(port);
        app.listen(process.env.PORT, () => console.log(`Server is running on port ${process.env.PORT}\nSockets listening on port ${port}`));
    })
    .catch((err) => console.log(err));

module.exports = app;