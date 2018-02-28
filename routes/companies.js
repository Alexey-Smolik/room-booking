const routes = require('express').Router();
const companies = require('../models').companies;

routes.get('/', (req, res) => {
    companies.findAll()
        .then(companies => {
            res.status(200).send(companies);
        })
        .catch(err => {
            res.status(500).send({ status: 'error', messsage: err.message });
        });


});

routes.put('/:id', (req, res) => {
    companies.findOne({ where: { id: req.params.id } })
        .then(company => {
            if(company) return companies.update(req.body, { where : { id: req.params.id } });
            else res.status(500).send({ status: 'error', messsage: 'Wrong id' });
        })
        .then(company => {
            res.status(200).send(company);
        })
        .catch(err => {
            res.status(500).send({ status: 'error', messsage: err.message });
        });
});

routes.delete('/:id', (req, res) => {
    companies.destroy({ where: { id: req.params.id } })
        .then(company => {
            company ? res.status(200).send({ status: 'success', messsage: 'Company successfully deleted' }) : res.status(500).send({ status: 'error', messsage: 'Wrong id' });
        })
        .catch(err => {
            res.status(500).send({ status: 'error', messsage: err.message });
        });
});

module.exports = routes;
