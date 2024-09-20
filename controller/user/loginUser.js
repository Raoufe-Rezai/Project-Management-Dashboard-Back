const Joi = require('joi');
const Jwt = require('jsonwebtoken')
const Context = require('../../Context');

const schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required().min(5),
});

const handler = async (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    let context = new Context();
    const user = await context.loginUser(username, password);
    if (!user)
        return res.status(400).send('The username or password is incorrect.');
    const token = Jwt.sign({ id: user.id }, process.env.JWT_KEY);
    return res.status(200).send({id: user.id, token: token});
}

module.exports = { handler, schema, auth: false };