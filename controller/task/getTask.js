const Joi = require('joi');
const Context = require('../../Context');

const schema = Joi.object({
});

const handler = async (req, res) => {
    let id = req.params.id;
    let context = new Context();
    const task = await context.getTask(id);
    if (!task)
        return res.status(400).send('Something went wrong.');
    return res.status(200).send(task);
}

module.exports = { handler, schema, auth: true };