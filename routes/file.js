//Not completed
const router = require('express').Router();
const requestHandler = require('../middleware/requestHandler');
const { jsonParser } = require('../middleware/bodyParser');
const { upload } = require('../multer');

const addFile = require('../controller/file/addFile');
const deleteFile = require('../controller/file/deleteFile');

router.post('/add', upload.single('file'), requestHandler(addFile));
// router.delete('/delete/:id', requestHandler(deleteFile));

module.exports = router;