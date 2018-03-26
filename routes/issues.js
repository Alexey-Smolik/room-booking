const routes = require('express').Router();
const issues = require('../models').issues;

routes.get('/', (req, res) => {
    issues.findAll()
        .then(issues => {
            res.send(issues);
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
});

routes.get('/:id', (req, res) => {
    issues.findOne({ where: { id: req.params.id } })
        .then(issue => {
            if(issue) res.send(issue);
            else res.status(500).send({ message: 'Wrong id' });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
});

routes.post('/', (req, res) => {
    if(req.user.role === 1) {
        issues.create(req.body)
            .then(issue => {
                res.status(201).send(issue);
            })
            .catch(err => {
                res.status(501).send({message: err.message});
            });
    } else res.status(500).send({ message: 'You have no rights' });
});

routes.put('/:id', (req, res) => {
    if(req.user.role === 1) {
        issues.findOne({where: {id: req.params.id}})
            .then(issue => {
                if (issue) return issues.update(req.body, {where: {id: req.params.id}});
                else res.status(500).send({message: 'Wrong id'});
            })
            .then(issue => {
                res.status(200).send(issue);
            })
            .catch(err => {
                res.status(500).send({message: err.message});
            });
    } else res.status(500).send({ message: 'You have no rights' });
});

routes.delete('/:id', (req, res) => {
    if(req.user.role === 1) {
        issues.destroy({where: {id: req.params.id}})
            .then(issue => {
                issue ? res.send(req.params.id.toString()) : res.status(500).send({message: 'Wrong id'});
            })
            .catch(err => {
                res.status(500).send({message: err.message});
            });
    } else res.status(500).send({ message: 'You have no rights' });
});

module.exports = routes;