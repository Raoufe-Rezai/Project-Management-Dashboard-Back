const Joi = require('joi');
const Context = require('../../Context');

const schema = Joi.object({
});

const handler = async (req, res) => {
    let assignee = req.query.assignee;
    let project_id = req.query.project_id;
    let filter = req.query.filter;
    let context = new Context();
    let task;
    if (assignee)
        task = await context.getTaskByUser(assignee);
    else if (project_id && filter)
        task = await context.getTaskByFilter(filter,project_id);
    else
        task = await context.getTaskByProject(project_id);
    if (!task)
        return res.status(400).send('There is no task.');
    return res.status(200).send(task);
}

module.exports = { handler, schema, auth: true };