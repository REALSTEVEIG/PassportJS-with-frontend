const express = require('express')
const router = express.Router()

const {dashboard} = require('../controllers/pages')

const authMiddleware = require('../middlewares/auth')

router.route('/dashboard').get(authMiddleware, dashboard)

module.exports = router