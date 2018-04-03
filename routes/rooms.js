const routes = require('express').Router();
const rooms = require('../models').rooms;
const events = require('../models').events;
const users = require('../models').users;
const images = require('../models').images;
const companies = require('../models').companies;
const issues = require('../models').issues;
const multer  = require('multer');
const config = require('../config/main');
const moment = require('moment');
const io = require('../sockets');

// ----- HANDLERS FOR ROOMS -----
// --- GET ALL ROOMS ---
routes.get('/', (req, res) => {
        if (req.query.startDate && req.query.endDate) {
            events.findAll({where: {date_from: {$between: [new Date(req.query.startDate), new Date(req.query.endDate)]}}})
                .then(events => {
                    return events.map(event => event.roomId);
                })
                .then(roomsId => {
                    return Promise.all([events.findAll({where: {date_to: {$between: [new Date(req.query.startDate), new Date(req.query.endDate)]}}}), roomsId.filter((value, index, self) => {
                        return self.indexOf(value) === index;
                    })]);
                })
                .then(rooms => {
                    return Promise.all([
                        events.findAll({where: {date_from: {$lt: new Date(req.query.endDate)}, date_to: {$gt: new Date(req.query.endDate)}}}),
                        rooms[0].map(event => event.roomId).concat(rooms[1]).filter((value, index, self) => {
                            return self.indexOf(value) === index;
                    })]);
                })
                .then(promiseRooms => {
                    let roomsId = promiseRooms[0].map(event => event.roomId).concat(promiseRooms[1]).filter((value, index, self) => {
                        return self.indexOf(value) === index;
                    });

                    return rooms.findAll({ where: { id: { $notIn: roomsId } }, include: [images, issues, {model: companies, attributes : ['name']}], order: [['id', 'DESC']]});
                })
                .then(rooms => {
                    res.send(rooms);
                })
                .catch(err => {
                    res.status(500).send({message: err.message});
                });
        }
        else {
            rooms.findAll({include: [images, issues, {model: companies, attributes : ['name']}],order: [['id', 'DESC']]})
                .then(rooms => {
                    res.send(rooms);
                })
                .catch(err => {
                    res.status(500).send({ message: err.message});
                });
        }
});

// --- GET ROOM BY ID ---
routes.get('/:id', (req, res) => {
    rooms.findOne({ where: { id: req.params.id }, include: [{ model: events, include: [ { model: users, attributes: ['username', 'id'] }] }] })
        .then(room => {
            if(room) res.status(200).send(room);
            else res.status(500).send({ message: 'Wrong id' });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
});

// --- GET ROOMS BY EVENTS UserId ---
routes.get('/events/:userId', (req, res) => {
    events.findAll({ where: { userId: req.params.userId } })
        .then(events => {
            return events.map(event => event.roomId).filter((value, index, self) => {
                return self.indexOf(value) === index;
            });
        })
        .then(roomsId => {
            return rooms.findAll({ where: { id: { $in: roomsId } }, include: [images, issues, {model: companies, attributes : ['name']}], order: [['id', 'DESC']]});
        })
        .then(rooms => {
            res.send(rooms);
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
});

// --- ADD NEW ROOM ---
routes.post('/', (req, res) => {
    if(req.user.role === 1) {
        rooms.create(req.body)
            .then(room => {
                io.emit('add room', room.dataValues);
                res.status(201).send(room);
            })
            .catch(err => {
                res.status(501).send({ message: err.message });
            });
    } else res.status(500).send({ message: 'You have no rights' });
});

// --- EDIT ROOM ---
routes.put('/:id', (req, res) => {
    if(req.user.role === 1) {
        rooms.findOne({where: {id: req.params.id}})
            .then(room => {
                if (room) return rooms.update(req.body, {where: {id: req.params.id}});
                else res.status(500).send({message: 'Wrong id'});
            })
            .then(() => {
                return rooms.findOne({where: {id: req.params.id}})
            })
            .then(room => {
                io.emit('edit room', room.dataValues);
                res.status(200).send(room);
            })
            .catch(err => {
                res.status(500).send({message: err.message});
            });
    } else res.status(500).send({ message: 'You have no rights' });
});

// --- DELETE ROOM ---
routes.delete('/:id', (req, res) => {
    if(req.user.role === 1) {
        rooms.destroy({where: {id: req.params.id}})
            .then(room => {
                if(room){
                    io.emit('delete room', req.params.id);
                    res.status(200).send(req.params.id);
                } else res.status(500).send({message: 'Wrong id'});
            })
            .catch(err => {
                res.status(500).send({message: err.message});
            });
    } else res.status(500).send({ message: 'You have no rights' });
});


// ----- ROUTES FOR ROOMS IMAGES -----
// --- GET IMAGE BY Id ---
routes.get('/images/:id', (req, res) => {
    images.findOne({ where: { id: req.params.id }})
        .then(image => {
            if(image) res.send(image);
            else res.status(500).send({ message: 'Wrong id' });
        })
        .catch(err => {
            res.status(500).send({message: err.message});
        });
});

// --- GET IMAGES BY RoomId ---
routes.get('/:id/images', (req, res) => {
    images.findAll({ where: { roomId: req.params.id } })
        .then(images => {
            res.send(images);
        })
        .catch(err => {
            res.status(500).send({message: err.message});
        });
});

// --- ADD NEW IMAGE ---
routes.post('/:id/images', (req, res) => {
    rooms.findOne({ where: { id: req.params.id }, include: [companies] })
        .then(room => {
            if(room){
                return multer.diskStorage({
                    destination: config.imagesDestination +
                    room.dataValues.company.dataValues.id + '_' + room.dataValues.company.dataValues.name + '/' +
                    req.params.id + '_' + room.dataValues.name,
                    filename: function (req, file, cb) {
                        cb(null, file.originalname);
                    }
                });
            }
            else res.status(500).send({message: 'Wrong room id'});
        })
        .then(storage => {
            let upload = multer({ storage: storage }).single('file');

            upload(req, res, err => {
                if(err) res.status(500).send(err.message);
                else{
                    images.findOne({ where: { url: req.file.destination.slice(8) + '/' + req.file.originalname, roomId: req.params.id }})
                        .then(image => {
                            if(image) res.status(501).send({message: 'You replace image that was already exists'});
                            else return images.create({ url: req.file.destination.slice(8) + '/' + req.file.originalname, roomId: req.params.id })
                        })
                        .then(image => {
                            res.send(image)
                        })
                }
            });
        })
        .catch(err => res.status(500).send({message: err.message}));
});

// --- DELETE IMAGE ---
routes.delete('/images/:id', (req, res) => {
    if(req.user.role === 1) {
        images.destroy({where: {id: req.params.id}})
            .then(image => {
                image ? res.status(200).send(req.params.id) : res.status(500).send({message: 'Wrong id'});
            })
            .catch(err => {
                res.status(500).send({message: err.message});
            });
    } else res.status(500).send({ message: 'You have no rights' });
});

// ----- ROUTES FOR ROOMS ISSUES -----
// --- GET ISSUES BY RoomId ---
routes.get('/:id/issues', (req, res) => {
    issues.findAll({ where: { roomId: req.params.id }, order: [['id', 'DESC']] })
        .then(issues => {
            res.send(issues);
        })
        .catch(err => {
            res.status(500).send({message: err.message});
        });
});

// ----- ROUTES FOR ROOMS EVENTS -----
// --- GET EVENTS BY RoomId ---
routes.get('/:id/events', (req, res) => {
    let where = req.query.userId ? { roomId: req.params.id, userId: req.query.userId } : { roomId: req.params.id };
    events.findAll({ where: where, include: [ { model: users, attributes: ['username'] }] })
        .then(events => {
            res.send(events);
        })
        .catch(err => {
            res.status(500).send({message: err.message});
        });
});

module.exports = routes;