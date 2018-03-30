const routes = require('express').Router();
const events = require('../models').events;
const rooms = require('../models').rooms;
const companies = require('../models').companies;
// ----- HANDLERS FOR ISSUES -----
// --- GET ALL EVENTS ---
routes.get('/', (req, res) => {
    events.findAll({ include: [ { model: rooms, include: companies } ] })
        .then(events => {
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
                io.emit('new event', event.dataValues);
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
                io.emit('edit event', event.dataValues);
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
                if(event){
                    io.emit('delete event', event.dataValues);
                    res.status(200).send({message: 'Event successfully deleted'});
                } else res.status(500).send({message: 'Wrong id'});
            })
            .catch(err => {
                res.status(500).send({message: err.message});
            });
    } else res.status(500).send({ message: 'You have no rights' });
});

module.exports = routes;