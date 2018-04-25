const routes = require('express').Router();
const events = require('../models').events;
const rooms = require('../models').rooms;
const companies = require('../models').companies;
const users = require('../models').users;
const invitations = require('../models').invitations;
const io = require('../sockets');

// ----- HANDLERS FOR ISSUES -----
// --- GET ALL EVENTS ---

routes.get('/', (req, res) => {
    events.findAll({ include: [ { model: rooms, include: companies }, { model: users, attributes: ['username'] } ] })
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
                let invitationUsers = req.body.invitations ? req.body.invitations.map(user => {
                    return {
                        eventId: event.dataValues.id,
                        userId: user
                    }
                }) : [];

                event.dataValues.username = req.body.username;
                return Promise.all([invitations.bulkCreate(invitationUsers), event.dataValues]);
            })
            .then(invites => {
                return Promise.all([invitations.findAll({ where: { eventId: invites[1].id }, include: { model: users, attributes : ['username'] } }), invites[1]]);
            })
            .then(invites => {
                invites[1].invitations = invites[0].map(invite => {
                    return {
                        user: { username: invite.dataValues.user.username, id: invite.dataValues.userId }
                    }
                });

                io.emit('add event', invites[1]);
                res.send(invites[1]);
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
            .then(() => {
                return events.findOne({where: {id: req.params.id}})
            })
            .then(event => {
                event.dataValues.username = req.body.username;
                return Promise.all([invitations.destroy({where: {eventId: req.params.id}}), event.dataValues]);
            })
            .then(invites => {
                let invitationUsers = req.body.invitations.map(user => {
                    return {
                        eventId: req.params.id,
                        userId: user
                    }
                });

                return Promise.all([invitations.bulkCreate(invitationUsers), invites[1]]);
            })
            .then(invites => {
                return Promise.all([invitations.findAll({ where: { eventId: invites[1].id }, include: { model: users, attributes : ['id', 'username'] } }), invites[1]]);
            })
            .then(invites => {
                invites[1].invitations = invites[0].map(invite => {
                    return {
                        user: { username: invite.dataValues.user.username, id: invite.dataValues.userId }
                    }
                });

                io.emit('edit event', invites[1]);
                res.send(invites[1]);
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
                    io.emit('delete event', req.params.id);
                    res.status(200).send(req.params.id);
                } else res.status(500).send({message: 'Wrong id'});
            })
            .catch(err => {
                res.status(500).send({message: err.message});
            });
    } else res.status(500).send({ message: 'You have no rights' });
});

module.exports = routes;