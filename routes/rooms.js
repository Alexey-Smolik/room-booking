const routes = require('express').Router();
const rooms = require('../models').rooms;
const events = require('../models').events;
const users = require('../models').users;

routes.get('/', (req, res) => {
    rooms.findAll()
        .then(rooms => {
            res.status(200).send(rooms);
        })
        .catch(err => {
            res.status(500).send({ status: 'error', messsage: err.message });
        });
});

routes.get('/:id', (req, res) => {
    rooms.findOne({ where: { id: req.params.id }, include: [{ model: events, include: [ { model: users, attributes: ['username', 'id'] }] }] })
        .then(room => {
            if(room) res.send(room);
            else res.status(500).send({ status: 'error', messsage: 'Wrong id' });
        })
        .catch(err => {
            res.status(500).send({ status: 'error', messsage: err.message });
        });
});

routes.post('/', (req, res) => {
    rooms.create(req.body)
        .then(room => {
            res.status(201).send(room);
        })
        .catch(err => {
            res.status(501).send({ status: "error", message: err.message });
        });
});

routes.put('/:id', (req, res) => {
    rooms.findOne({ where: { id: req.params.id } })
        .then(rooms => {
            if(rooms) return rooms.update(req.body, { where : { id: req.params.id } });
            else res.status(500).send({ status: 'error', messsage: 'Wrong id' });
        })
        .then(rooms => {
            console.log(rooms);
            res.status(200).send(user);
        })
        .catch(err => {
            res.status(500).send({ status: 'error', messsage: err.message });
        });
});

routes.delete('/:id', (req, res) => {
    rooms.destroy({ where: { id: req.params.id } })
        .then(rooms => {
            rooms ? res.status(200).send({ status: 'success', messsage: 'Room successfully deleted' }) : res.status(500).send({ status: 'error', messsage: 'Wrong id' });
        })
        .catch(err => {
            res.status(500).send({ status: 'error', messsage: err.message });
        });
});

module.exports = routes;