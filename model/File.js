const Base = require('./Base');

module.exports = (sequelize, DataTypes) => {
    return Base(sequelize, DataTypes, "file", {
        id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
        task_id: { type: DataTypes.INTEGER, allowNull: false },
        link: { type: DataTypes.STRING, allowNull: false }
    });
}