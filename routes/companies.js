const routes = require('express').Router();
const companies = require('../models').companies;

routes.get('/', (req, res) => {
    companies.findAll()
        .then(companies => {
            res.send(companies);
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
});

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

routes.post('/', (req, res) => {
    if(req.user.role === 1) {
        companies.create(req.body)
            .then(company => {
                res.status(201).send(company);
            })
            .catch(err => {
                res.status(501).send({message: err.message});
            });
    } else res.status(500).send({ message: 'You have no rights' });
});

routes.put('/:id', (req, res) => {
    if(req.user.role === 1) {
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
    } else res.status(500).send({ message: 'You have no rights' });
});

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