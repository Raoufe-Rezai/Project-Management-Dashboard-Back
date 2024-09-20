const router = require('express').Router();
const requestHandler = require('../middleware/requestHandler');
const { jsonParser } = require('../middleware/bodyParser');

const addProject = require('../controller/project/addProject');
const deleteProject = require('../controller/project/deleteProject');
const getProjectInfo = require('../controller/project/getProjectInfo');
const getMyProject = require('../controller/project/getMyProject');

router.post('/add', jsonParser, requestHandler(addProject));
router.delete('/delete/:id', requestHandler(deleteProject));
router.get('/:id', requestHandler(getProjectInfo));
router.get('/', requestHandler(getMyProject));

module.exports = router;