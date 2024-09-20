const router = require('express').Router();
const requestHandler = require('../middleware/requestHandler');

const getHistory = require('../controller/history/getHistory');

router.get('/', requestHandler(getHistory));

module.exports = router;