//Not completed
const Joi = require('joi');
const Context = require('../../Context');

const schema = Joi.object({
});

const handler = async (req, res) => {
    let task_id = req.task_id;
    let link = req.file.path;
    let context = new Context();
    const file = await context.addFile({ task_id: task_id, link: link });
    if (!file)
        return res.status(400).send('File does not create.')
    console.log(req.file, req.body)
    return res.status(200).send(req.file);
}

module.exports = { handler, schema, auth: false };