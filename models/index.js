const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const config = require('../config/main');
const sequelize = new Sequelize(`${config.db.driver}://${config.db.user}:${config.db.password}@${config.db.host}:${config.db.port}/${config.db.database}`, {logging: false});
const db = {};

fs
    .readdirSync(__dirname)
    .filter(function(file) {
        return (file.indexOf(".") !== 0) && (file !== 'index.js');
    })
    .forEach(function(file) {
        let model = sequelize.import(path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach(function(modelName) {
    if ("associate" in db[modelName]) {
        db[modelName].associate(db);
    }
});

// ----- SEQUELIZE ASSOCIATIONS -----
// --- COMPANIES WITH ROOMS ---
db.companies.hasMany(db.rooms, { foreignKey: { allowNull: false }, onDelete: 'cascade' });
db.rooms.belongsTo(db.companies);

// --- ROOMS WITH EVENTS ---
db.rooms.hasMany(db.events, { foreignKey: { allowNull: false }, onDelete: 'cascade' });
db.events.belongsTo(db.rooms);

// --- USERS WITH EVENTS ---
db.users.hasMany(db.events, { foreignKey: { allowNull: false }, onDelete: 'cascade' });
db.events.belongsTo(db.users);

// --- ROOMS WITH IMAGES ---
db.rooms.hasMany(db.images, { foreignKey: { allowNull: false }, onDelete: 'cascade' });
db.images.belongsTo(db.rooms);

// --- ROOMS WITH ISSUES ---
db.rooms.hasMany(db.issues, { foreignKey: { allowNull: false }, onDelete: 'cascade' });
db.issues.belongsTo(db.rooms);

// --- EVENTS WITH INVITATIONS ---
db.events.hasMany(db.invitations, { foreignKey: { allowNull: false }, onDelete: 'cascade' });
db.invitations.belongsTo(db.events);

// --- EVENTS WITH USERS ---
db.users.hasMany(db.invitations, { foreignKey: { allowNull: false }, onDelete: 'cascade' });
db.invitations.belongsTo(db.users);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;