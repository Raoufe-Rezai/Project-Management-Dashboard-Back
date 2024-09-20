const Joi = require('joi');
const Context = require('../../Context');

const schema = Joi.object({
});

const handler = async (req, res) => {
    let user_id = req.query.user_id;
    let context = new Context();
    const project = await context.getMyProject(user_id);
    if (project.length == 0)
        return res.status(400).send('This user has no projects.')
    return res.status(200).send(project);
}

module.exports = { handler, schema, auth: true };