const Joi = require('joi');
const Context = require('../../Context');

const schema = Joi.object({
    project_id: Joi.number().required(),
    assignee: Joi.number().required(),
    subject: Joi.string().required(),
    description: Joi.string(),
    status: Joi.object().keys({ type: Joi.string().valid('New', 'In progress', 'Stop', 'Done', 'Cancelled'), }).required(),
    priority: Joi.object().keys({ type: Joi.string().valid('Do first', 'High', 'Normal'), }).required(),
    progress: Joi.number().min(0).max(100),
    due_date: Joi.date(),
    spent_time: Joi.number(),
});

const handler = async (req, res) => {
    let data = req.body;
    data.status = data.status.type;
    data.priority = data.priority.type;
    let context = new Context();
    const task = await context.addTask(data);
    if (!task)
        return res.status(400).send('Task does not create.')
    return res.status(200).send(task);
}

module.exports = { handler, schema, auth: true };