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
    companies.create(req.body)
        .then(company => {
            res.status(201).send(company.dataValues);
        })
        .catch(err => {
            res.status(501).send({ message: err.message });
        });
});

routes.put('/:id', (req, res) => {
    companies.findOne({ where: { id: req.params.id } })
        .then(company => {
            if(company) return companies.update(req.body, { where : { id: req.params.id } });
            else res.status(500).send({ message: 'Wrong id' });
        })
        .then(company => {
            res.status(200).send(company);
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
});

routes.delete('/:id', (req, res) => {
    companies.findById(req.params.id)
        .then(company => {
            if (!company) {
                return res.status(404).send({
                    message: 'Company Not Found',
                });
            }
            return company
                .destroy()
                .then(() => res.status(200).send(company))
                .catch(error => res.status(400).send(error));
        })
        .catch(error => res.status(400).send(error));
});

module.exports = routes;