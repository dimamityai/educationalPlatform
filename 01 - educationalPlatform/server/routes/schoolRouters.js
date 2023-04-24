const Router = require('express');
const router = new Router(); 
const schoolController = require('../controllers/schoolController');

//метод для создания school
router.post('/', schoolController.create)
//метод для получения всех school
router.get('/', schoolController.getAll)
//метод для получения конкретного school
router.get('/:id', schoolController.getOne)



//экспорипруем роутер
module.exports = router;