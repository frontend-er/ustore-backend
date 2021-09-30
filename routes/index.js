const Router = require('express');
const router = new Router()
const courseRouter = require('./courseRouter');
const lectorsRouter = require('./lectorsRouter');
const sectionsRouter = require('./sectionsRouter');
const userRouter = require('./userRouter')

router.use('/user', userRouter)
router.use('/section', sectionsRouter)
router.use('/lector', lectorsRouter)
router.use('/course', courseRouter)



module.exports = router;