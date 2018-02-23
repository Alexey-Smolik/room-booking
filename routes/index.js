const routes = require('express').Router({mergeParams: true});
const auth = require('./auth');
const users = require('./users');
const authHelpers = require('../middleware/auth');

routes.use('/auth', auth);
routes.use('/api/', authHelpers);
routes.use('/api/users', users);

module.exports = routes;