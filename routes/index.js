const express = require('express');
const routes = express.Router({mergeParams: true});
const auth = require('./auth');
const users = require('./users');
const rooms = require('./rooms');
const companies = require('./companies');
const events = require('./events');
const issues = require('./issues');
const path = require('path');
const authHelpers = require('../middleware/auth');

routes.use('/auth', auth);

routes.use(authHelpers); // middleware for user authentification
routes.use(express.static(path.join(__dirname, 'public')));
routes.use(express.static(path.join(__dirname, 'public/images')));

routes.use('/api/users', users); // users handler
routes.use('/api/rooms', rooms); // rooms handler
routes.use('/api/companies', companies); // companies handler
routes.use('/api/events', events); // events handler
routes.use('/api/issues', issues); // issues handler

module.exports = routes;