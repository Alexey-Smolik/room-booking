const express = require('express');
const app = express();
const models = require('./models');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const bodyParser = require('body-parser');
const logger = require('morgan');
const pgSession = require('connect-pg-simple')(session);
//const io = require('./sockets');
//require('./config/main');
const config = require('./config/main');

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({
    store: new pgSession({
        conString : `${config.db.driver}://${config.db.user}:${config.db.password}@${config.db.host}:${config.db.port}/${config.db.database}`
    }),
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 } // 30 days
}));

app.use(logger('dev'));
app.use(passport.initialize());
app.use(passport.session());
app.use('/', require('./routes'));

models.sequelize.sync()
    .then(() => {
        //const port = 8000;
        //io.listen(port);
        app.listen(process.env.PORT, () => console.log(`Server is running on port ${process.env.PORT}\nSockets listening on port`));
    })
    .catch((err) => console.log(err));

module.exports = app;