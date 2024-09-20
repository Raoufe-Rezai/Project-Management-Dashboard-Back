const Base = require('./Base');

module.exports = (sequelize, DataTypes) => {
    return Base(sequelize, DataTypes, "user", {
        id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
        firstname: { type: DataTypes.STRING, allowNull: false },
        lastname: { type: DataTypes.STRING, allowNull: false },
        username: { type: DataTypes.STRING, allowNull: false },
        password: { type: DataTypes.STRING, allowNull: false },
        email: { type: DataTypes.STRING, allowNull: false }
    });
}