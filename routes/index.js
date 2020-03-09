const express = require('express');
const router = express.Router();

const authenticateRouter = require('./authenticate');
const usersRouter = require('./users');

router.use('/authenticate', authenticateRouter);
router.use('/users', usersRouter);

module.exports = router;
