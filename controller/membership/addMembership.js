const Joi = require('joi');
const Context = require('../../Context');

const schema = Joi.object({
    project_id: Joi.number().required(),
    user_id: Joi.number().required(),
    is_admin: Joi.bool().required(),
    email: Joi.string().email().required(),
});

const handler = async (req, res) => {
    let data = req.body;
    let context = new Context();
    const membership = await context.addMembership(data);
    if (!membership)
        return res.status(400).send('Only admin user can invite.')
    if (membership == false)
        return res.status(400).send('There is no user with this email.')
    return res.status(200).send(membership);
}

module.exports = { handler, schema, auth: true };