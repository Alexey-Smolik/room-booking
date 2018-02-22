const routes = require('express').Router({mergeParams: true});
const auth = require('./auth');

routes.use('/auth', auth);

module.exports = routes;