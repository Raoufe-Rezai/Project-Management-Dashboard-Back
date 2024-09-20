const Joi = require('joi');
const Context = require('../../Context');

const schema = Joi.object({

});

const handler = async (req, res) => {
    let task = req.query.task;
    let context = new Context();
    const history = await context.getHistory(task);
    if (!history)
        return res.status(400).send('History does not exit.')
    return res.status(200).send(history);
}

module.exports = { handler, schema, auth: true };