const express = require('express')
const router = express()

const {registerPage, loginPage, register, login, logout} = require('../controllers/auth')

router.route('/register').get(registerPage).post(register)
router.route('/login').get(loginPage).post(login)
router.route('/logout').get(logout)

module.exports = router