const Joi = require('joi');
const Context = require('../../Context');

const schema = Joi.object({
});

const handler = async (req, res) => {
    let id = req.params.id;
    let context = new Context();
    const projectInfo = await context.getProjectInfo(id);
    if (!projectInfo)
        res.status(400).send('Project have no task.')
    return res.status(200).send(projectInfo);
}

module.exports = { handler, schema, auth: true };