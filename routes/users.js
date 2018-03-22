const routes = require('express').Router();
const users = require('../models').users;

routes.get('/', (req, res) => {
    if(req.user.role === 1){
        users.findAll()
            .then(users => {
                res.status(200).send(users);
            })
            .catch(err => {
                res.status(500).send({ message: err.message });
            });
    } else res.status(500).send({ message: 'You have no rights' });
});

routes.post('/', (req, res) => {
    req.body.role = 3;
    users.create(req.body)
        .then(user => {
            res.status(201).send(user);
        })
        .catch(err => {
            res.status(501).send({ message: err.message });
        });
});

routes.put('/:id', (req, res) => {
    if(req.user.role === 1) {
        users.findOne({where: {id: req.params.id}})
            .then(user => {
                if (user) return users.update(req.body, {where: {id: req.params.id}});
                else res.status(500).send({message: 'Wrong id'});
            })
            .then(user => {
                res.status(200).send(user);
            })
            .catch(err => {
                res.status(500).send({message: err.message});
            });
    } else res.status(500).send({ message: 'You have no rights' });
});

routes.delete('/:id', (req, res) => {
    if(req.user.role === 1) {
        users.destroy({where: {id: req.params.id}})
            .then(user => {
                user ? res.status(200).send({message: 'User successfully deleted'}) : res.status(500).send({message: 'Wrong id'});
            })
            .catch(err => {
                res.status(500).send({message: err.message});
            });
    }
});

routes.get('/current', (req, res) => {
    req.user ? res.send(req.user) : res.send(401).send({ message: 'Unauthorized' });
});

module.exports = routes;