const Router = require('express');
const router = new Router()
const CourseController = require('../controllers/courseController');
const checkRoleMeiddleware = require('../middleware/checkRoleMeiddleware');



router.post('/', checkRoleMeiddleware('ADMIN'), CourseController.create)
router.get('/', CourseController.getAll)
router.get('/:id', CourseController.getOne)


module.exports = router;