module.exports = function(sequelize, DataTypes) {
    var Rooms = sequelize.define('rooms', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
          type: DataTypes.STRING,
            allowNull: false
        },
        floor: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        description: {
          type: DataTypes.STRING,
          allowNull: true
        },
    },{
        timestamps: false
    });

    return Rooms;
};