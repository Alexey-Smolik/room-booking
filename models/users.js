module.exports = function(sequelize, DataTypes) {
    var Users = sequelize.define('users', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.CHAR(60),
            allowNull: true
        },
        provider: {
            type: DataTypes.CHAR(60),
            allowNull: true
        },
        personal_id: {
            type: DataTypes.CHAR(60),
            allowNull: true
        }
    }, {
        timestamps: false
    });

    return Users;
};