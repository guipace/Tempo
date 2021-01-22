const router = require('express').Router();
const userRouter = require('./users');
const sessionRouter = require('./session');

router.use('/users', userRouter);
router.use('/session', sessionRouter);

module.exports = router;
