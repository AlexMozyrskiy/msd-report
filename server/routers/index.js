const Router = require('express');
const router = new Router();
const userRouter = require('./user');
const adminRouter = require('./admin');

router.use('/user', userRouter);
router.use('/admin', adminRouter);

module.exports = router;
