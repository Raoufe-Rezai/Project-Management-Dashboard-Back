const Joi = require('joi');
const Context = require('../../Context');

const schema = Joi.object({
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    username: Joi.string().required(),
    password: Joi.string().min(5),
    email: Joi.string().email().required(),
});

const handler = async (req, res) => {
    let id = req.params.id;
    let data = req.body;
    let context = new Context();
    const user = await context.updateUser(id,data);
    if (!user)
        return res.status(400).send('User does not exits.');
    if(user == true)
        return res.status(400).send('Duplicate username or password.');
    return res.status(200).send({ username: user.username, firstname: user.firstname, lastname: user.lastname, email: user.email });
}

module.exports = { handler, schema, auth: true };