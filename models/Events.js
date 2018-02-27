module.exports = function(sequelize, DataTypes) {
    var Events = sequelize.define('events', {

        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
          type: DataTypes.STRING,
            allowNull: true
        },
        date_from: {
          type: DataTypes.DATE,
            allowNull: false
        },
        date_to: {
          type: DataTypes.DATE,
            allowNull: false
        },

    },{
        timestamps: false
    });

    return Events;
};

