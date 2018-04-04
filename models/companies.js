module.exports = function(sequelize, DataTypes) {
    let Companies = sequelize.define('companies', {

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

    }
}, {
    timestamps: false
});

return Companies;
};




