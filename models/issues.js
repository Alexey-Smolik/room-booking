module.exports = function(sequelize, DataTypes) {
    let Issues = sequelize.define('issues', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        active: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    },{
        timestamps: false
    });

    return Issues;
};

