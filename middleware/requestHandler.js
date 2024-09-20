const winston = require('../config/winston');
const Joi = require('joi');
const Jwt = require('jsonwebtoken');

const handler = (controller) => async (req, res, next) => {
    let start_time = new Date();
    let meta = {
        method: req.method,
        url: req.originalUrl,
        header: req.headers,
        body: req.body,
        start_time,
    };
    try {
        winston.info('New request was generated.', meta);
        //check for auth
        if (controller.auth) {
            try {
                Jwt.verify(req.headers.token, process.env.JWT_KEY);
            } catch {
                return res.sendStatus(403);
            }
        }

        //check for validation
        if (controller.schema) {
            const validation = Joi.compile(controller.schema)
                .prefs({ errors: { label: 'key' } })
                .validate(req.body);

            if (validation.error) {
                let message = validation.error.details.map((detailes) => detailes.message).join(', ');
                return res.status(400).send(message);
            }
        }

        //call controller
        let response;
        if (controller.handler)
            response = await controller.handler(req, res);
        meta.status = response.statusCode;
        meta.end_time = new Date();
        meta.duration = meta.end_time - start_time;
        winston.info(`It was responed in ${meta.duration} ms`, meta);
    } catch (err) {
        meta.end_time = new Date();
        meta.duration = meta.end_time - start_time;
        meta.error = err;
        winston.error('Internal server error', meta);
        return res.status(500).send('Internal server error');
    }
};

module.exports = handler;