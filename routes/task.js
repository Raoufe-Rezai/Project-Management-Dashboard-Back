const router = require('express').Router();
const requestHandler = require('../middleware/requestHandler');
const { jsonParser } = require('../middleware/bodyParser');

const addTask = require('../controller/task/addTask');
const updateTask = require('../controller/task/updateTask');
const getTask = require('../controller/task/getTask');
const getTaskByFilter = require('../controller/task/getTaskByFilter');

router.post('/add', jsonParser, requestHandler(addTask));
router.put('/:id', jsonParser, requestHandler(updateTask));
router.get('/:id', requestHandler(getTask));
router.get('/',requestHandler(getTaskByFilter));

module.exports = router;