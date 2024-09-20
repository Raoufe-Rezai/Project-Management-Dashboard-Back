const Joi = require('joi');
const Context = require('../../Context');

const schema = Joi.object({
    name: Joi.string().required(),
    id: Joi.number().required()
});

const handler = async (req, res) => {
    let data = req.body;
    let context = new Context();
    const project = await context.addProject(data);
    if (!project)
        return res.status(400).send('Project does not create.')
    return res.status(200).send(true);
}

module.exports = { handler, schema, auth: true };