const routes = require('express').Router();
const offices = require('../models').offices;
const rooms = require('../models').rooms;

// ----- HANDLERS FOR ISSUES -----
// --- GET ALL OFFICES ---
routes.get('/', (req, res) => {
    offices.findAll({
        order: [['id', 'DESC']]
    })
        .then(offices => {
            res.send(offices);
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
});

// --- GET OFFICE BY Id ---
routes.get('/:id', (req, res) => {
    offices.findOne({ where: { id: req.params.id } })
        .then(office => {
            if(office) res.send(office);
            else res.status(500).send({ message: 'Wrong id' });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
});

// --- ADD NEW OFFICE ---
routes.post('/', (req, res) => {
    if(req.user.role === 1) {
        if(req.body.name || req.body.address){
            offices.create(req.body)
                .then(office => {
                    res.status(201).send(office);
                })
                .catch(err => {
                    res.status(501).send({message: err.message});
                });
        } else res.status(500).send({ message: 'Wrong params' });
    } else res.status(500).send({ message: 'You have no rights' });
});

// --- EDIT OFFICE ---
routes.put('/:id', (req, res) => {
    if(req.user.role === 1) {
        if(req.body.name || req.body.address){
            offices.findOne({where: {id: req.params.id}})
                .then(office => {
                    if (office) return offices.update(req.body, {where: {id: req.params.id}});
                    else res.status(500).send({message: 'Wrong id'});
                })
                .then(office => {
                    res.status(200).send(office);
                })
                .catch(err => {
                    res.status(500).send({message: err.message});
                });
        } else res.status(500).send({ message: 'Wrong params' });
    } else res.status(500).send({ message: 'You have no rights' });
});

// --- DELETE OFFICE ---
routes.delete('/:id', (req, res) => {
    if(req.user.role === 1) {
        offices.destroy({where: {id: req.params.id}})
            .then(office => {
                office ? res.send(req.params.id.toString()) : res.status(500).send({message: 'Wrong id'});
            })
            .catch(err => {
                res.status(500).send({message: err.message});
            });
    } else res.status(500).send({ message: 'You have no rights' });
});

module.exports = routes;