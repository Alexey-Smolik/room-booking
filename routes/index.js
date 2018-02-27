const routes = require('express').Router({mergeParams: true});
const auth = require('./auth');
const users = require('./users');
const rooms = require('./rooms');
const companies = require('./companies');
const events = require('./events');
const authHelpers = require('../middleware/auth');

routes.use('/auth', auth);
routes.use('/api/', authHelpers);
routes.use('/api/users', users);
routes.use('/api/rooms', rooms);
routes.use('/api/companies', companies);
routes.use('/api/events', events);


module.exports = routes;