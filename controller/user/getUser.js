const Joi = require('joi');
const Context = require('../../Context');

const schema = Joi.object({

});

const handler = async (req, res) => {
    let id = req.params.id;
    let context = new Context();
    const user = await context.getUser(id);
    if (!user)
        return res.status(400).send('User does not exits.');
    return res.status(200).send(user);
}

module.exports = { handler, schema, auth: true };