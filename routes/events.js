const routes = require('express').Router();
const events = require('../models').events;
const rooms = require('../models').rooms;
const offices = require('../models').offices;
const users = require('../models').users;
const invitations = require('../models').invitations;
const io = require('../sockets');
const ical = require('ical-generator');
const mkdirp = require('mkdirp');
const nodemailer = require('nodemailer');
const tokens = require('../constants/tokens');

// ----- HANDLERS FOR ISSUES -----
// --- GET ALL EVENTS ---

routes.get('/', (req, res) => {
    getEvents(req.query.userId)
        .then(events => {
            res.send(events);
        })
        .catch(err => {
            res.status(500).send({ status: 'error', message: err.message });
        })
});

const getEvents = (userId) => {
    if(userId) return (getInvitesId(userId)); else return events.findAll({ include: [ { model: rooms, include: offices }, { model: users, attributes: ['username'] }, { model: invitations, attributes: ['id'], include: [{ model: users, attributes: ['id', 'username']}] } ]});
};

const getInvitesId = userId => {
    return invitations.findAll({ where: { userId: userId } })
       .then(invites => {
           let invitesId = invites.map(invite => invite.dataValues.eventId);
           return events.findAll({ where: { id: { $in: invitesId }}, include: [{ model: invitations, attributes: ['userId'], include: [{ model: users, attributes: ['id', 'username']}]}] });
       })
       .catch(err => {
           return err.message;
       });
};

// --- GET EVENT BY Id---
routes.get('/:id', (req, res) => {
    events.findOne({ where: { id: req.params.id }, include: [ { model: rooms, include: offices } ] })
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
                return Promise.all([invitations.findAll({ where: { eventId: invites[1].id }, include: { model: users, attributes : ['username', 'email'] } }), invites[1]]);
            })
            .then(invites => {
                if(invites[0].length){
                    const cal = ical({ domain: 'http://localhost:3000', name: invites[1].name });
                    const start = new Date(invites[1].date_from);
                    const end = new Date(invites[1].date_to);
                    start.setTime(start.getTime() + start.getTimezoneOffset() * 60 * 1000);
                    end.setTime(end.getTime() + end.getTimezoneOffset() * 60 * 1000);

                    cal.addEvent({
                        start: start,
                        end: end,
                        summary: invites[1].name,
                        uid: invites[1].id,
                        description: invites[1].description,
                        organizer: {
                            name: req.user.username,
                            email: req.user.email
                        },
                        method: 'request'
                    });

                    let transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                            user: tokens.email.name,
                            pass: tokens.email.password
                        }
                    });
                    let mailOptions = {
                        from: `${req.user.username} <${req.user.email}>`,
                        to: invites[0].map(invite => invite.dataValues.user.email).toString(),
                        subject: `✔ You are invited to an event: ${invites[1].name} ✔`,
                        alternatives: [{
                            contentType: "text/calendar",
                            content: new Buffer(cal.toString())
                        }]
                    };

                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            return console.log(error);
                        }
                        console.log('Message sent: %s', info.messageId);
                        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
                        return true;
                    });
                }

                return Promise.all([invites[0].map(invite => {
                    return {
                        user: { username: invite.dataValues.user.username, id: invite.dataValues.userId }
                    }
                }), invites[1]]);
            })
            .then(invites => {
                invites[1].invitations = invites[0];
                io.emit('add event', invites[1]);
                res.send(invites[1]);
            })
            .catch(err => {
                console.log(err);
                res.status(501).send({message: err.message});
            });
    } else res.status(500).send({ message: 'You have no rights' });
});

const getEmails = (invites) => {
    return invites.map(invite => invite.dataValues.user.email).toString();
};

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
                    res.send(req.params.id);
                } else res.status(500).send({message: 'Wrong id'});
            })
            .catch(err => {
                res.status(500).send({message: err.message});
            });
    } else res.status(500).send({ message: 'You have no rights' });
});

module.exports = routes;