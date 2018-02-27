module.exports = function(sequelize, DataTypes) {
    var Companies = sequelize.define('companies', {

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
        type: DataTypes.CHAR(60),
            allowNull: false

    },
}, {
    timestamps: false
});

return Companies;
};




