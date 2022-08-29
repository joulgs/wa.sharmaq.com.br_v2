const express = require('express')
const controller = require('../controllers/instance.controller')
const keyVerify = require('../middlewares/keyCheck')
const loginVerify = require('../middlewares/loginCheck')
const SHTokenVerification = require('../middlewares/sharmaqTokenCheck')

const router = express.Router()
router.route('/init').get(SHTokenVerification, controller.init)
router.route('/qr').get(keyVerify, SHTokenVerification, controller.qr)
router.route('/qrbase64').get(keyVerify, controller.qrbase64)
router.route('/info').get(keyVerify, SHTokenVerification, controller.info)
router.route('/logout').delete(keyVerify, loginVerify, controller.logout)

// router.route('/restore').get(controller.restore)
// router.route('/test').get(controller.test)
// router.route('/delete').delete(keyVerify, loginVerify, controller.delete)
// router.route('/list').get(controller.list)

module.exports = router
