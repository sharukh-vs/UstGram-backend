const router = require('express').Router();
const { getUsers, addUser, register } = require('../controller/UserController')
const uploadFile = require('../middleware/multer');

router.get('/', getUsers)
router.post('/', uploadFile, register);

module.exports = router