const routes = require('express').Router();
const rooms = require('../models').rooms;

routes.get('/', (req, res) => {
    rooms.findAll()
        .then(rooms => {
            res.status(200).send(rooms);
        })
        .catch(err => {
            res.status(500).send({ status: 'error', messsage: err.message });
        });


});

routes.put('/:id', (req, res) => {
    rooms.findOne({ where: { id: req.params.id } })
        .then(rooms => {
            if(rooms) return rooms.update(req.body, { where : { id: req.params.id } });
            else res.status(500).send({ status: 'error', messsage: 'Wrong id' });
        })
        .then(rooms => {
            console.log(rooms);
            res.status(200).send(user);
        })
        .catch(err => {
            res.status(500).send({ status: 'error', messsage: err.message });
        });
});

routes.delete('/:id', (req, res) => {
    rooms.destroy({ where: { id: req.params.id } })
        .then(rooms => {
            rooms ? res.status(200).send({ status: 'success', messsage: 'Room successfully deleted' }) : res.status(500).send({ status: 'error', messsage: 'Wrong id' });
        })
        .catch(err => {
            res.status(500).send({ status: 'error', messsage: err.message });
        });
});

module.exports = routes;