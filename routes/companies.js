const routes = require('express').Router();
const companies = require('../models').companies;
const rooms = require('../models').rooms;

// ----- HANDLERS FOR ISSUES -----
// --- GET ALL COMPANIES ---
routes.get('/', (req, res) => {
    companies.findAll({
        order: [['id', 'DESC']]
    })
        .then(companies => {
            res.send(companies);
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
});

// --- GET COMPANY BY Id ---
routes.get('/:id', (req, res) => {
    companies.findOne({ where: { id: req.params.id } })
        .then(company => {
            if(company) res.send(company);
            else res.status(500).send({ message: 'Wrong id' });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
});

// --- ADD NEW COMPANY ---
routes.post('/', (req, res) => {
    if(req.user.role === 1) {
        if(req.body.name || req.body.address){
            companies.create(req.body)
                .then(company => {
                    res.status(201).send(company);
                })
                .catch(err => {
                    res.status(501).send({message: err.message});
                });
        } else res.status(500).send({ message: 'Wrong params' });
    } else res.status(500).send({ message: 'You have no rights' });
});

// --- EDIT COMPANY ---
routes.put('/:id', (req, res) => {
    if(req.user.role === 1) {
        if(req.body.name || req.body.address){
            companies.findOne({where: {id: req.params.id}})
                .then(company => {
                    if (company) return companies.update(req.body, {where: {id: req.params.id}});
                    else res.status(500).send({message: 'Wrong id'});
                })
                .then(company => {
                    res.status(200).send(company);
                })
                .catch(err => {
                    res.status(500).send({message: err.message});
                });
        } else res.status(500).send({ message: 'Wrong params' });
    } else res.status(500).send({ message: 'You have no rights' });
});

// --- DELETE COMPANY ---
routes.delete('/:id', (req, res) => {
    if(req.user.role === 1) {
        companies.destroy({where: {id: req.params.id}})
            .then(company => {
                company ? res.send(req.params.id.toString()) : res.status(500).send({message: 'Wrong id'});
            })
            .catch(err => {
                res.status(500).send({message: err.message});
            });
    } else res.status(500).send({ message: 'You have no rights' });
});

module.exports = routes;