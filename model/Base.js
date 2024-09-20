module.exports = (sequelize, DataTypes, name, model, config) => {
    //config
    if (config == undefined)
        config = {};
    if (config.freezeTableName == undefined)
        config.freezeTableName = true;
    if (config.tableName == undefined)
        config.tableName = name;
    if (config.underscored == undefined)
        config.underscored = true;
    config.timestamps = true;
    config.paranoid = true;
    config.createdAt = true;
    config.updatedAt = true;
    return sequelize.define(name, model, config);
}