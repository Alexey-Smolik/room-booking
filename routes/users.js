const routes = require('express').Router();
const users = require('../models').users;


routes.get('/', (req, res) => {
    users.findAll()
        .then(users => {
            res.status(200).send(users);
        })
        .catch(err => {
            res.status(500).send({ status: 'error', messsage: err.message });
        });


});

routes.put('/:id', (req, res) => {
    users.findOne({ where: { id: req.params.id } })
        .then(user => {
            if(user) return users.update(req.body, { where : { id: req.params.id } });
            else res.status(500).send({ status: 'error', messsage: 'Wrong id' });
        })
        .then(user => {
            res.status(200).send(user);
        })
        .catch(err => {
            res.status(500).send({ status: 'error', messsage: err.message });
        });
});

routes.delete('/:id', (req, res) => {
    users.destroy({ where: { id: req.params.id } })
        .then(user => {
            user ? res.status(200).send({ status: 'success', messsage: 'User successfully deleted' }) : res.status(500).send({ status: 'error', messsage: 'Wrong id' });
        })
        .catch(err => {
            res.status(500).send({ status: 'error', messsage: err.message });
        });
});

routes.get('/current', (req, res) => {
    req.user ? res.send(req.user) : res.send(401).send({ status: 'error', message: 'Unauthorized' });
});



module.exports = routes;