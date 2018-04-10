const routes = require('express').Router();
const users = require('../models').users;
const bcrypt = require('bcrypt-as-promised');

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

// --- GET ALL MANAGERS ---
routes.get('/managers', (req, res) => {
    users.findAll({where: { role: 2 }, order: [['id', 'DESC']], attributes : ['id', 'username']})
        .then(users => {
            res.status(200).send(users);
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
});

// --- ADD NEW USER ---
routes.post('/', (req, res) => {
    req.body.role = req.body.role || 3;

    users.findOne({where: { username: req.body.username }})
        .then(user => {
            if(user){
                res.status(500).send({ message: "User with that name is already exist" });
            }
            else {
                return bcrypt.genSalt(10);
            }
        })
        .then(salt => {
            console.log(111111);
            return bcrypt.hash(req.body.password, salt);
        })
        .then(hash => {
            req.body.password = hash;
            return users.create(req.body);
        })
        .then(user => {
            res.status(201).send(user);
        })
        .catch(err => {
            res.status(501).send({ message: err.message });
        });
});

// --- EDIT USER ---
routes.put('/:id', (req, res) => {
    if(req.user.role === 1) {
        users.findOne({where: {id: req.params.id}})
            .then(user => {
                if (user){
                    if(user.dataValues.provider) return users.update({ username: req.body.username, role: req.body.role}, {where: {id: req.params.id}});
                    //else if(!req.body.password)
                        //else return getUserWithCryptPass(req.body);
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

function getUserWithCryptPass(user) {
    bcrypt.genSalt(10)
        .then(salt => {
            return bcrypt.hash(req.body.password, salt);
        })
        .then(hash => {
            req.body.password = hash;
            return users.update(req.body, {where: {id: req.params.id}});
        })
        .catch(err => {
            res.status(500).send({message: err.message});
        });
}

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