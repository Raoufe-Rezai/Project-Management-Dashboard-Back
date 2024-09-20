const Joi = require('joi');
const Context = require('../../Context');

const schema = Joi.object({
});

const handler = async (req, res) => {
    let { userId, projectId, memId } = req.params;
    let context = new Context();
    const membership = await context.deleteMembership(userId, projectId, memId);
    if (!membership)
        return res.status(400).send('Only admin users can delete.');
    if (membership == 1)
        return res.status(200).send('Delete Successfully');
    return res.status(400).send('Membership does not delete.');
}

module.exports = { handler, schema, auth: true };