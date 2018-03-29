module.exports = function(sequelize, DataTypes) {
    let Users = sequelize.define('users', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
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
        },
        role: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        timestamps: false
    });

    return Users;
};