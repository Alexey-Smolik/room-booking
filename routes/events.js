const routes = require('express').Router();
const events = require('../models').events;
const rooms = require('../models').rooms;
const companies = require('../models').companies;
const io = require('socket.io')();

io.on('connection', socket => {
    socket.on('chat message', msg => {
        console.log(msg);
    })
});

// ----- HANDLERS FOR ISSUES -----
// --- GET ALL EVENTS ---
routes.get('/', (req, res) => {
    events.findAll({ include: [ { model: rooms, include: companies } ] })
        .then(events => {
            io.sockets.emit('new event', event);
            res.status(200).send(events);
        })
        .catch(err => {
            res.status(500).send({ status: 'error', message: err.message });
        })
});

// --- GET EVENT BY Id---
routes.get('/:id', (req, res) => {
    events.findOne({ where: { id: req.params.id }, include: [ { model: rooms, include: companies } ] })
        .then(events => {
            res.send(events);
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        })
});

// --- ADD NEW EVENT ---
routes.post('/', (req, res) => {
    if(req.user.role === 1 || req.user.role === 2) {
        events.create(req.body)
            .then(event => {
                res.status(201).send(event);
            })
            .catch(err => {
                res.status(501).send({message: err.message});
            });
    } else res.status(500).send({ message: 'You have no rights' });
});

// --- EDIT EVENT ---
routes.put('/:id', (req, res) => {
    if(req.user.role === 1 || req.user.role === 2) {
        events.findOne({where: {id: req.params.id}})
            .then(event => {
                if (event) return events.update(req.body, {where: {id: req.params.id}});
                else res.status(500).send({message: 'Wrong id'});
            })
            .then(event => {
                res.status(200).send(event);
            })
            .catch(err => {
                res.status(500).send({message: err.message});
            });
    } else res.status(500).send({ message: 'You have no rights' });
});

// --- DELETE EVENT ---
routes.delete('/:id', (req, res) => {
    if(req.user.role === 1 || req.user.role === 2) {
        events.destroy({where: {id: req.params.id}})
            .then(event => {
                event ? res.status(200).send({message: 'Event successfully deleted'}) : res.status(500).send({message: 'Wrong id'});
            })
            .catch(err => {
                res.status(500).send({message: err.message});
            });
    } else res.status(500).send({ message: 'You have no rights' });
});

module.exports = routes;