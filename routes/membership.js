const router = require('express').Router();
const requestHandler = require('../middleware/requestHandler');
const { jsonParser } = require('../middleware/bodyParser');

const addMembership = require('../controller/membership/addMembership');
const updateMembership = require('../controller/membership/updateMembership');
const deleteMembership = require('../controller/membership/deleteMembership');
const getMembership = require('../controller/membership/getMembership');

router.post('/add', jsonParser, requestHandler(addMembership));
router.put('/:id', jsonParser, requestHandler(updateMembership));
router.delete('/delete/:userId/:projectId/:memId',requestHandler(deleteMembership));
router.get('/',requestHandler(getMembership));

module.exports = router;