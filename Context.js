const Sequelize = require('sequelize');
const { Op } = require('sequelize');
const Bcrypt = require('./bcrypt');

module.exports = class Context {
    constructor() {
        this.database = require('./database');
    }

    init() {
        //Tables
        const User = require('./model/User');
        const user = User(this.database, Sequelize.DataTypes);

        const Project = require('./model/Project');
        const project = Project(this.database, Sequelize.DataTypes);

        const File = require('./model/File');
        const file = File(this.database, Sequelize.DataTypes);

        const History = require('./model/History');
        const history = History(this.database, Sequelize.DataTypes);

        const Membership = require('./model/Membership');
        const membership = Membership(this.database, Sequelize.DataTypes);

        const Task = require('./model/Task');
        const task = Task(this.database, Sequelize.DataTypes);

        //Set foreignKey
        user.hasMany(task, { foreignKey: { name: 'assignee', allowNull: false } });
        task.belongsTo(user);

        user.hasMany(membership, { foreignKey: { name: 'user_id', allowNull: false } });
        membership.belongsTo(user);

        user.hasMany(history, { foreignKey: { name: 'user_id', allowNull: false } });
        history.belongsTo(user);

        task.hasMany(file, { foreignKey: { name: 'task_id', allowNull: false } });
        file.belongsTo(task);

        task.hasMany(history, { foreignKey: { name: 'task_id', allowNull: false } });
        history.belongsTo(task);

        project.hasMany(task, { foreignKey: { name: 'project_id', allowNull: false } });
        task.belongsTo(project);

        project.hasMany(membership, { foreignKey: { name: 'project_id', allowNull: false } });
        membership.belongsTo(project);

        this.database.sync({ force: false });
    }
    //User
    async addUser(data) {
        let user = await this.database.models.user.findOne({
            where: { [Op.or]: [{ username: data.username }, { email: data.email }] }
        });
        if (user)
            return true
        data.password = await Bcrypt.hashData(data.password)
        return await this.database.models.user.create(data);
    }
    async loginUser(username, password) {
        let user = await this.database.models.user.findOne({ where: { username } });
        let valid = await Bcrypt.compareData(password, user.password);
        if (valid)
            return user;
        return undefined;
    }
    async updateUser(id, data) {
        let old_user = await this.database.models.user.findOne({ where: { id } });
        if (!old_user)
            return undefined;
        if (old_user.username != data.username || old_user.email != data.email) {
            let user = await this.database.models.user.findOne({
                where: { [Op.or]: [{ username: data.username }, { email: data.email }] }
            });
            if (user)
                return true;
        }
        old_user.firstname = data.firstname;
        old_user.lastname = data.lastname;
        old_user.password = data.password ? await Bcrypt.hashData(data.password) : old_user.password;
        old_user.username = data.username;
        old_user.email = data.email;
        return await old_user.save();
    }
    async getUser(id) {
        return await this.database.models.user.findOne({
            where: { id },
            attributes: ['username', 'firstname', 'lastname', 'email']
        });
    }
    //project
    async addProject(data) {
        let project = await this.database.models.project.create({ "name": data.name });
        let mem = {
            "project_id": project.id,
            "is_admin": true,
            "user_id": data.id
        }
        return await this.database.models.membership.create(mem);
    }
    async deleteProject(id) {
        return await this.database.models.project.destroy({ where: { id } });
    }
    async getMyProject(user_id) {
        return await this.database.models.project.findAll({
            include: {
                model: this.database.models.membership,
                required: true,
                where: { user_id },
                attributes: ['is_admin']
            },
            attributes: ['id', 'name', 'createdAt', 'updatedAt']
        });
    }
    async getProjectInfo(project_id) {
        return await this.database.models.task.findOne({
            attributes: [
                [Sequelize.fn("COUNT", Sequelize.col("id")), 'count'],
                [Sequelize.fn("SUM", Sequelize.col("spent_time")), 'spent_time'],
                [Sequelize.fn("AVG", Sequelize.col("progress")), 'progress'],
            ],
            raw: true,
            where: { project_id }
        });
    }
    //task
    async addTask(data) {
        return await this.database.models.task.create(data);
    }
    async updateTask(id, data) {
        let old_task = await this.database.models.task.findOne({ where: { id } });
        if (!old_task)
            return old_task;
        this.addHistory(data, old_task);
        Object.keys(data).forEach(function (key) {
            old_task[key] = data[key]
        });
        return await old_task.save();
    }
    async getTask(id) {
        return await this.database.models.user.findAll({
            include: [
                {
                    model: this.database.models.task, required: true, where: { id },
                    include: { model: this.database.models.project, required: true, attributes: ['id', 'name'] }
                }
            ], attributes: ['id', 'username']
        });
    }
    async getTaskByUser(id) {
        return await this.database.models.user.findAll({
            include: [
                {
                    model: this.database.models.task, required: true,
                    include: { model: this.database.models.project, required: true, attributes: ['id', 'name'] }
                }
            ],
            where: { id }, attributes: ['id', 'username']
        });
    }
    async getTaskByProject(project_id) {
        return await this.database.models.user.findAll({
            include: [
                {
                    model: this.database.models.task, where: { project_id }, order: [['due_date', 'ASC']],
                    include: { model: this.database.models.project, required: true, attributes: ['id', 'name'] }

                },
            ], attributes: ['id', 'username']
        });
    }
    async getTaskByFilter(filter, project_id) {
        return await this.database.models.task.findAll({
            attributes: [
                [Sequelize.fn("COUNT", Sequelize.col("id")), 'count'],
                filter
            ],
            raw: true,
            where: { project_id },
            group: [filter]
        });
    }
    //membership
    async addMembership(data) {
        let is_admin = await this.isAdmin(data.user_id, data.project_id);
        if (!is_admin)
            return undefined;
        let user = await this.database.models.user.findOne({ where: { email: data.email } });
        if (!user)
            return false;
        data = {
            project_id: data.project_id,
            user_id: user.id,
            is_admin: data.is_admin
        }
        return await this.database.models.membership.create(data);
    }
    async updateMembership(id, data) {
        let is_admin = await this.isAdmin(data.user_id, data.project_id);
        if (!is_admin)
            return undefined;
        let new_mem = await this.database.models.membership.findOne({ where: { id } });
        if (!new_mem)
            return false;
        new_mem.is_admin = data.is_admin;
        return await new_mem.save();
    }
    async deleteMembership(userId, projectId, memId) {
        let is_admin = await this.isAdmin(userId, projectId);
        if (!is_admin)
            return undefined;
        return await this.database.models.membership.destroy({ where: { id: memId } });
    }
    async getMembership(project_id) {
        return await this.database.models.user.findAll({
            include: {
                model: this.database.models.membership,
                required: true,
                where: { project_id },
                attributes: ['id', 'is_admin']
            },
            attributes: ['id', 'username']
        });
    }
    async isAdmin(user_id, project_id) {
        let mem = await this.database.models.membership.findOne({ where: { user_id, project_id } });
        return mem.is_admin ? true : false;
    }
    //history
    async addHistory(new_task, prev_task) {
        let log = {
            user_id: new_task.user_id,
            task_id: prev_task.id,
            log: `note :${new_task.note}`
        }
        if (new_task.note)
            await this.database.models.history.create(log);
        log.log = '';
        prev_task.note = new_task.note;
        prev_task.user_id = new_task.user_id;
        prev_task.description = new_task.description;
        Object.keys(new_task).forEach(function (key) {
            if (key === 'due_date') {
                const newDate = new Date(new_task[key]);
                const prevDate = new Date(prev_task[key]);

                if (newDate.getTime() !== prevDate.getTime()) {
                    log.log += `${key} changed from ${prev_task[key]} to ${new_task[key]},`;
                }
            } else if (new_task[key] != prev_task[key])
                log.log += `${key} change from ${prev_task[key]} to ${new_task[key]},`;
        });
        if (log.log)
            return await this.database.models.history.create(log);
        return false
    }
    async getHistory(task_id) {
        return await this.database.models.user.findAll({
            include: {
                model: this.database.models.history,
                required: true,
                where: { task_id },
                attributes: ['id', 'task_id', 'log', 'createdAt'],
                order: [['created_at', 'DESC']]
            },
            attributes: ['id', 'username']
        });
    }
    //file --> This section must be completed.
    async addFile(file) {
        return await this.database.models.file.create(file);
    }
}