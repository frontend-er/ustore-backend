const Router = require('express');
const UserController = require('../controllers/userComtroller')
const {
   body
} = require('express-validator')
const authMiddleware = require('../errors/auth-middleware')
const router = new Router()


router.post('/registration',
   body('email').isEmail(),
   body('password').isLength({
      min: 3,
      max: 30
   }), UserController.regestration)
router.post('/logout', UserController.logout)
router.post('/login', UserController.login)
router.get('/activate/:link', UserController.activate)
router.get('/refresh', UserController.refresh)
router.get('/users', authMiddleware, UserController.getUsers)



/*
router.post('/registration', UserController.registration)
router.post('/login', UserController.login)
router.get('/auth', UserController.check)

*/


module.exports = router;