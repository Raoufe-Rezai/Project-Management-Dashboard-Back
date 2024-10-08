const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, path.parse(file.originalname).name + '-' + Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({ storage: storage });

module.exports = { upload }