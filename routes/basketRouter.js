const Router = require('express');
const router = new Router()
const BasketController = require('../controllers/basketController');
const authMiddleware = require('../errors/auth-middleware');



router.post('/', authMiddleware, BasketController.addItemToCart);
router.get('/', authMiddleware, BasketController.getCart);
router.delete('/', authMiddleware, BasketController.emptyCart);



module.exports = router;