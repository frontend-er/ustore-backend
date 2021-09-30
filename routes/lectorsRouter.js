const Router = require('express');
const router = new Router()
const LectorController = require('../controllers/lectorController')
const checkRoleMiddleware = require('../middleware/checkRoleMeiddleware')

router.post('/', checkRoleMiddleware('ADMIN'), LectorController.create)
router.get('/', LectorController.getAll)




module.exports = router;