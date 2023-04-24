const Router = require('express');
const router = new Router();
const user_test_resultController = require('../controllers/user_test_resultController');
const checkRole = require('../middleware/checkRoleMiddleware');
const authMiddleware = require('../middleware/authMiddleware');

// router.post('/', checkRole('ADMIN'), user_test_resultController.create)
router.post('/', user_test_resultController.create)

// router.get('/:id', authMiddleware,  user_test_resultController.getAllByUserId)
router.get('/', user_test_resultController.getAllByUserId)

router.delete('/:id', checkRole('ADMIN'), user_test_resultController.delete)

module.exports = router;