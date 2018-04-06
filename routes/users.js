const routes = require('express').Router();
const users = require('../models').users;
const bcrypt = require('bcryptjs');

// ----- HANDLERS FOR USERS -----
// --- GET ALL USERS ---
routes.get('/', (req, res) => {
    if(req.user.role === 1){
        users.findAll({order: [['id', 'DESC']]})
            .then(users => {
                res.status(200).send(users);
            })
            .catch(err => {
                res.status(500).send({ message: err.message });
            });
    } else res.status(500).send({ message: 'You have no rights' });
});

// --- ADD NEW USER ---
routes.post('/', (req, res) => {
    req.body.role = req.body.role || 3;

    const salt = bcrypt.genSaltSync(10);
    bcrypt.hash(req.body.password, salt, (err, hash) => {
        if (err) {
            res.status(409).send({ status: "error", message: "crypt error" });
        } else {
            req.body.password = hash;
            users.create(req.body)
                .then(user => {
                    res.status(201).send(user);
                })
                .catch(err => {
                    res.status(501).send({ message: err.message });
                });
        }
    });
});

// --- EDIT USER ---
routes.put('/:id', (req, res) => {
    if(req.user.role === 1) {
        users.findOne({where: {id: req.params.id}})
            .then(user => {
                if (user){
                    const salt = bcrypt.genSaltSync(10);
                    bcrypt.hash(req.body.password, salt, (err, hash) => {
                        if (err) {
                            res.status(409).send({ status: "error", message: "crypt error" });
                        } else {
                            req.body.password = hash;
                            return users.update(req.body, {where: {id: req.params.id}});
                        }
                    });
                }
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

// --- DELETE USER ---
routes.delete('/:id', (req, res) => {
    if(req.user.role === 1) {
        users.destroy({where: {id: req.params.id}})
            .then(user => {
                user ? res.status(200).send(req.params.id.toString()) : res.status(500).send({message: 'Wrong id'});
            })
            .catch(err => {
                res.status(500).send({message: err.message});
            });
    }
});

// --- GET CURRENT USER ---
routes.get('/current', (req, res) => {
    if(!Number.isInteger(req.user.id))
        req.user = { username: 'Anonymous', role: 3 };

    req.user ? res.send(req.user) : res.send(401).send({ message: 'Unauthorized' });
});

module.exports = routes;