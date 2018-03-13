const routes = require('express').Router();
const events = require('../models').events;
const rooms = require('../models').rooms;
const companies = require('../models').companies;

//select * from events
routes.get('/', (req, res) => {
    events.findAll({ include: [ { model: rooms, include: companies } ] })
        .then(events => {
            res.status(200).send(events);
        })
        .catch(err => {
            res.status(500).send({ status: 'error', message: err.message });
        })
});

routes.get('/:id', (req, res) => {
    events.findOne({ where: { id: req.params.id }, include: [ { model: rooms, include: companies } ] })
        .then(events => {
            res.send(events);
        })
        .catch(err => {
            res.status(500).send({ status: 'error', message: err.message });
        })
});

routes.post('/', (req, res) => {
    events.create(req.body)
        .then(event => {
            res.status(201).send(event);
        })
        .catch(err => {
            res.status(501).send({ status: "error", message: err.message });
        });
});

routes.put('/:id', (req, res) => {
    events.findOne({ where: { id: req.params.id } })
        .then(event => {
            if(event) return events.update(req.body, { where : { id: req.params.id } });
            else res.status(500).send({ status: 'error', messsage: 'Wrong id' });
        })
        .then(event => {
            res.status(200).send(event);
        })
        .catch(err => {
            res.status(500).send({ status: 'error', messsage: err.message });
        });
});

routes.delete('/:id', (req, res) => {
    events.destroy({ where: { id: req.params.id } })
        .then(event => {
            event ? res.status(200).send({ status: 'success', messsage: 'Event successfully deleted' }) : res.status(500).send({ status: 'error', messsage: 'Wrong id' });
        })
        .catch(err => {
            res.status(500).send({ status: 'error', messsage: err.message });
        });
});

module.exports = routes;