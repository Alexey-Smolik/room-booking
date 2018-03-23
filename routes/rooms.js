const routes = require('express').Router();
const rooms = require('../models').rooms;
const events = require('../models').events;
const users = require('../models').users;
const images = require('../models').images;
const companies = require('../models').companies;
const multer  = require('multer');
const config = require('../config/main');

// ----- ROUTES FOR ROOMS -----
routes.get('/', (req, res) => {
        if (req.query.startDate && req.query.endDate) {
            events.findAll({where: {date_from: {$gte: req.query.startDate}, date_to: {$lte: req.query.endDate}}, include: [images]})
                .then(events => {
                    return events.map(event => event.roomId);
                })
                .then(roomsId => {
                    roomsId = roomsId.filter((value, index, self) => {
                        return self.indexOf(value) === index;
                    });

                    return rooms.findAll({ where: { id: { $notIn: roomsId } }});
                })
                .then(rooms => {
                    res.send(rooms);
                })
                .catch(err => {
                    res.status(500).send({message: err.message});
                });
        }
        else {
            rooms.findAll({include: [images]})
                .then(rooms => {
                    res.send(rooms);
                })
                .catch(err => {
                    res.status(500).send({ message: err.message});
                });
        }
});

routes.get('/:id', (req, res) => {
    rooms.findOne({ where: { id: req.params.id }, include: [{ model: events, include: [ { model: users, attributes: ['username', 'id'] }] }] })
        .then(room => {
            if(room) res.send(room);
            else res.status(500).send({ message: 'Wrong id' });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
});

routes.post('/', (req, res) => {
    if(req.user.role === 1) {
        rooms.create(req.body)
            .then(room => {
                res.status(201).send(room);
            })
            .catch(err => {
                res.status(501).send({ message: err.message });
            });
    } else res.status(500).send({ message: 'You have no rights' });
});

routes.put('/:id', (req, res) => {
    if(req.user.role === 1) {
        rooms.findOne({where: {id: req.params.id}})
            .then(rooms => {
                if (rooms) return rooms.update(req.body, {where: {id: req.params.id}});
                else res.status(500).send({message: 'Wrong id'});
            })
            .then(rooms => {
                res.status(200).send(rooms);
            })
            .catch(err => {
                res.status(500).send({message: err.message});
            });
    } else res.status(500).send({ message: 'You have no rights' });
});

routes.delete('/:id', (req, res) => {
    if(req.user.role === 1) {
        rooms.destroy({where: {id: req.params.id}})
            .then(rooms => {
                rooms ? res.status(200).send(req.params.id) : res.status(500).send({message: 'Wrong id'});
            })
            .catch(err => {
                res.status(500).send({message: err.message});
            });
    } else res.status(500).send({ message: 'You have no rights' });
});


// ----- ROUTES FOR ROOMS IMAGES -----
routes.get('images/:id', (req, res) => {
    images.findOne({ where: { id: req.params.id }})
        .then(image => {
            if(image) res.send(image);
            else res.status(500).send({ message: 'Wrong id' });
        })
        .catch(err => {
            res.status(500).send({message: err.message});
        });
});

routes.get(':id/images', (req, res) => {
    images.find({ where: { roomId: req.params.id } })
        .then(images => {
            res.send(images);
        })
        .catch(err => {
            res.status(500).send({message: err.message});
        });
});

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
                    images.findOne({ where: { url: req.file.destination + '/' + req.file.originalname, roomId: req.params.id }})
                        .then(image => {
                            if(image) res.status(501).send({message: 'Image with that name already exists'});
                            else return images.create({ url: req.file.destination + '/' + req.file.originalname, roomId: req.params.id })
                        })
                        .then(image => {
                            res.send(image)
                        })
                }
            });
        })
        .catch(err => res.status(500).send({message: err.message}));
});

module.exports = routes;