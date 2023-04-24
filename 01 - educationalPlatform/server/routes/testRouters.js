const Router = require('express');
const router = new Router(); 
const testController = require('../controllers/testController');
const checkRole = require('../middleware/checkRoleMiddleware');

//метод для создания теста
router.post('/', checkRole('ADMIN'), testController.create)
//метод для получения всех тестов
router.get('/', testController.getAll)
//метод для получения конкретного теста
router.get('/:id', testController.getOne)
//метод для удаления конкретного теста
router.delete('/:id', testController.delete)


//экспорипруем роутер
module.exports = router;