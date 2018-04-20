module.exports = function(sequelize, DataTypes) {
    let Invitations = sequelize.define('invitations', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }
    },{
        timestamps: false
    });

    return Invitations;
};

