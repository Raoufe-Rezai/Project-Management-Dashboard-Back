const Joi = require('joi');
const Context = require('../../Context');

const schema = Joi.object({
});

const handler = async (req, res) => {
    let id = req.params.id;
    let context = new Context();
    const del = await context.deleteProject(id);
    if (del == true)
        return res.status(200).send('Delete Successfully');
    return res.status(400).send('Project does not delete.');
}

module.exports = { handler, schema, auth: true };