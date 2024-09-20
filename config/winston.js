const winston = require('winston');
let option = {
    console: {
        level: 'debug',
        handleExceptions: true,
        json: true,
        colorize: true,
    },
};

const logger = winston.createLogger({
    format: winston.format.combine(
        winston.format.json(),
        winston.format.timestamp(),
        winston.format.prettyPrint(),
    ),
    transports: [
        new winston.transports.File({ filename: 'logger.log' }),
        new winston.transports.Console(option.console)
    ],
    exitOnError: false
});

logger.stream = {
    write : function(message,encoding){
        logger.info(message);
    }
};

module.exports = logger;