const Router = require('express');
const router = new Router(); 
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const testController = require("../controllers/testController");

router.post('/registration', userController.registration)

router.post('/login', userController.login)

router.get('/information/:id', authMiddleware, userController.getOne)

router.get('/auth', authMiddleware, userController.check_auth)

router.get('/delete', userController.delete)

module.exports = router;