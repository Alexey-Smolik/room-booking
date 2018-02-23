const express = require('express');
const app = express();
const models = require('./models');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const path = require('path');
require('./config/main');

app.use(cookieParser());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', require('./routes'));

models.sequelize
    .sync()
    .then(() => {
        app.listen(process.env.PORT, () => console.log(`Server is running on port ${process.env.PORT}`));
    })
    .catch((err) => console.log(err));

module.exports = app;