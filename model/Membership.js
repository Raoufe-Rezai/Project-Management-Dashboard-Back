const Base = require('./Base');

module.exports = (sequelize, DataTypes) => {
    return Base(sequelize, DataTypes, "membership", {
        id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
        user_id: { type: DataTypes.INTEGER, allowNull: false },
        project_id: { type: DataTypes.INTEGER, allowNull: false },
        is_admin: { type: DataTypes.BOOLEAN, allowNull: false }
    });
}