const Base = require('./Base');

module.exports = (sequelize, DataTypes) => {
    return Base(sequelize, DataTypes, "task", {
        id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
        project_id: { type: DataTypes.INTEGER, allowNull: false },
        assignee: { type: DataTypes.INTEGER, allowNull: false },
        subject: { type: DataTypes.STRING, allowNull: false },
        status: { type: DataTypes.ENUM('New','In progress','Stop','Done','Cancelled'), allowNull: false },
        priority: { type: DataTypes.ENUM('Do first','High','Normal'), allowNull: false },
        progress: { type: DataTypes.INTEGER, allowNull: true },
        description: { type: DataTypes.STRING, allowNull: true },
        due_date: { type: DataTypes.DATE, allowNull: true },
        spent_time: { type: DataTypes.INTEGER, allowNull: true }
    });
}