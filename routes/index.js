const express = require('express');
const routes = express.Router({mergeParams: true});
const auth = require('./auth');
const users = require('./users');
const rooms = require('./rooms');
const companies = require('./companies');
const events = require('./events');
//const issues = require('./issues');
const path = require('path');
const authHelpers = require('../middleware/auth');

routes.use('/auth', auth);

routes.use(authHelpers);
routes.use(express.static(path.join(__dirname, 'public')));
routes.use(express.static(path.join(__dirname, 'public/images')));

routes.use('/api/users', users);
routes.use('/api/rooms', rooms);
routes.use('/api/companies', companies);
routes.use('/api/events', events);
//routes.use('/api/issues', issues);

module.exports = routes;