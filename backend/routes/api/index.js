const router = require('express').Router();
const userRouter = require('./users');
const sessionRouter = require('./session');
const genresRouter = require('./genres');
const tracksRouter = require('./tracks');

router.use('/users', userRouter);
router.use('/session', sessionRouter);
router.use('/genres', genresRouter);
router.use('/tracks', tracksRouter);

module.exports = router;
