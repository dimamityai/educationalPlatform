const Router = require('express');
const router = new Router(); 
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const testController = require("../controllers/testController");

//метод для создания регистрации пользователя
//!!!функции пердается без скобок, потому что нет смысла их вызвывать => передаем как объект
router.post('/registration', userController.registration)
//метод для создания логина пользователя
router.post('/login', userController.login)
//метод для получения конкретного пользователя с его пройденными тестами
router.get('/information/:id', authMiddleware, userController.getOne)
//метод для информации о авторизации пользователя
router.get('/auth', authMiddleware, userController.check_auth)
//метод для удаления пользователя
router.get('/delete', userController.delete)


//экспорипруем роутер
module.exports = router;