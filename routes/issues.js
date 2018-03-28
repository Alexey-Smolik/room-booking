const routes = require('express').Router();
const issues = require('../models').issues;
const rooms= require('../models').rooms;


// ----- HANDLERS FOR ISSUES -----
// --- GET ALL ISSUES ---
routes.get('/', (req, res) => {
    issues.findAll({
        order: [['id', 'DESC']], include: [{model: rooms, attributes : ['name']}],
    })
        .then(issues => {
            res.send(issues);
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
});

// --- GET ISSUES BY roomId ---
routes.get('/:id', (req, res) => {
    issues.findAll({ where: { roomId: req.params.id }, include: [{model: rooms, attributes : ['name']}] })
        .then(issue => {
            if(issue) res.send(issue);
            else res.status(500).send({ message: 'Wrong id' });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
});

// --- ADD NEW ISSUE ---
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

// --- EDIT ISSUE ---
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

// --- DELETE ISSUE ---
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