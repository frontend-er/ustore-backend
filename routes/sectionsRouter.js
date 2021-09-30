const Router = require('express');
const router = new Router()
const SectionController = require('../controllers/sectionController');
const checkRoleMeiddleware = require('../middleware/checkRoleMeiddleware');

router.post('/', checkRoleMeiddleware('ADMIN'), SectionController.create)
router.get('/', SectionController.getAll)




module.exports = router;