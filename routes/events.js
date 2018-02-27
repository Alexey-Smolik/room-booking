const routes = require('express').Router();
const events = require('../models').events;
const rooms = require('../models').rooms;
const companies = require('../models').companies;

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
            events ? res.status(200).send({ status: 'success', messsage: 'Event successfully deleted' }) : res.status(500).send({ status: 'error', messsage: 'Wrong id' });
        })
        .catch(err => {
            res.status(500).send({ status: 'error', message: err.message });
        })
});

module.exports = routes;