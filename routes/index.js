const Router = require('express');
const router = new Router()
const courseRouter = require('./courseRouter');
const lectorsRouter = require('./lectorsRouter');
const sectionsRouter = require('./sectionsRouter');
const userRouter = require('./userRouter')
const basketRouter = require('./basketRouter');
const authMiddleware = require('../errors/auth-middleware');


router.use('/user', userRouter)
router.use('/section', sectionsRouter)
router.use('/lector', lectorsRouter)
router.use('/course', courseRouter)
router.use('/basket', basketRouter)




module.exports = router;