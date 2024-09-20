//dotenv
require('dotenv').config();

//winston
const winston = require('./config/winston');

//Uncaught
const Uncaught = require('uncaught');
Uncaught.start();
Uncaught.addListener((err) => {
    winston.error('Uncaught error.', err);
});

//database
const Context = require('./Context');
const context = new Context();
context.init();

//express
const express = require('express');
const app = express();

//cors
const cors = require('cors');
app.use(cors());

//routes
app.use('/user', require('./routes/user'));
app.use('/task', require('./routes/task'));
app.use('/project', require('./routes/project'));
app.use('/membership', require('./routes/membership'));
app.use('/history', require('./routes/history'));
app.use('/file', require('./routes/file'));

//body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.listen(process.env.server_port, () => {
    winston.info(`server listening on port ${process.env.server_port}`)
});