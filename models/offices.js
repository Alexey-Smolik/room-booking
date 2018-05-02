// MODEL COMPANIES
module.exports = function(sequelize, DataTypes) {
    let Offices = sequelize.define('offices', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false
        }}, {
        timestamps: false
    });
    return Offices;
};




