module.exports = function(sequelize, DataTypes) {
    var Companies = sequelize.define('companies', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true
        },

    }
}