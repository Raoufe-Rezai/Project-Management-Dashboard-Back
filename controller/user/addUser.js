const Joi = require('joi');
const Context = require('../../Context');

const schema = Joi.object({
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    username: Joi.string().required(),
    password: Joi.string().required().min(5),
    email: Joi.string().email().required(),
});

const handler = async (req, res) => {
    let data = req.body;
    let context = new Context();
    const user = await context.addUser(data);
    if (user == true)
        return res.status(400).send('This username or email exists.')
    if (!user)
        return res.status(400).send('Something went wrong, try again.')
    return res.status(200).send(true);
}

module.exports = { handler, schema, auth: false };