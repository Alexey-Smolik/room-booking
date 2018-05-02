const express = require('express');
const routes = express.Router({mergeParams: true});
const auth = require('./auth');
const users = require('./users');
const rooms = require('./rooms');
const offices = require('./offices');
const events = require('./events');
const issues = require('./issues');
const path = require('path');
const authHelpers = require('../middleware/auth');

routes.use('/auth', auth); // auth handler

routes.use(express.static(path.join(__dirname, '../public')));
routes.use(authHelpers); // middleware for user authentification

routes.use('/api/users', users); // users handler
routes.use('/api/rooms', rooms); // rooms handler
routes.use('/api/offices', offices); // offices handler
routes.use('/api/events', events); // events handler
routes.use('/api/issues', issues); // issues handler

module.exports = routes;