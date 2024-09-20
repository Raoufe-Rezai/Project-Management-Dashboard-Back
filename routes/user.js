const router = require('express').Router();
const requestHandler = require('../middleware/requestHandler');
const { jsonParser } = require('../middleware/bodyParser');

const addUser = require('../controller/user/addUser');
const loginUser = require('../controller/user/loginUser');
const updateUser = require('../controller/user/updateUser');
const getUser = require('../controller/user/getUser');

router.post('/add', jsonParser, requestHandler(addUser));
router.post('/login', jsonParser, requestHandler(loginUser));
router.put('/:id', jsonParser, requestHandler(updateUser));
router.get('/:id', requestHandler(getUser));

module.exports = router;