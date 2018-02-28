const express = require('express');
const routes = express.Router({mergeParams: true});
const auth = require('./auth');
const users = require('./users');
const rooms = require('./rooms');
const companies = require('./companies');
const events = require('./events');
const path = require('path');
const authHelpers = require('../middleware/auth');

routes.use('/auth', auth);
routes.use(express.static('/public'), authHelpers);

routes.use('/main', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'main.html'));
});
routes.use('/api/users', users);
routes.use('/api/rooms', rooms);
routes.use('/api/companies', companies);
routes.use('/api/events', events);


module.exports = routes;