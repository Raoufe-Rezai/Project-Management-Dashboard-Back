const Joi = require('joi');
const Context = require('../../Context');

const schema = Joi.object({
    is_admin: Joi.bool().required(),
    user_id: Joi.number().required(),
    project_id: Joi.number().required(),
});

const handler = async (req, res) => {
    let id = req.params.id;
    let data = req.body;
    let context = new Context();
    const membership = await context.updateMembership(id, data);
    if(membership == false)
        return res.status(400).send('There is no such record.');
    if (!membership)
        return res.status(400).send('Only admin users can update.');
    return res.status(200).send(membership);
}

module.exports = { handler, schema, auth: true };