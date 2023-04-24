const Router = require('express');
const router = new Router(); 
const test_typeController = require('../controllers/test_typeController');
//метод для создания теста
router.post('/', test_typeController.create)
//метод для получения всех тестов
router.get('/', test_typeController.getAll)
//метод для получения конкретного теста
router.get('/:id', test_typeController.getOne)
//метод для удаления конкретного теста
router.delete('/:id', test_typeController.delete)


//экспорипруем роутер
module.exports = router;