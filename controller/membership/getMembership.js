const Joi = require('joi');
const Context = require('../../Context');

const schema = Joi.object({
});

const handler = async (req, res) => {
    let project_id = req.query.project_id;
    let context = new Context();
    const membership = await context.getMembership(project_id);
    if (!membership)
        return res.status(400).send('This project does not have user');
    return res.status(200).send(membership);
}

module.exports = { handler, schema, auth: true };