const routes = require('express').Router();
const users = require('../models').users;

routes.get('/', (req, res) => {
    console.log(req.user);
    users.findAll()
        .then(users => {
            res.send(users);
        })
        .catch(err => {
            res.status(500).send({ status: 'error', messsage: err.message });
        });
});

routes.get('/current', (req, res) => {
    req.user ? res.send(req.user) : res.send(401).send({ status: 'error', message: 'Unauthorized' });
});

module.exports = routes;