module.exports = function(sequelize, DataTypes) {
    let Images = sequelize.define('images', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        url: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },{
        timestamps: false
    });

    return Images;
};

