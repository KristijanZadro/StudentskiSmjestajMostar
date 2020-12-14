const express = require("express")
const router = express.Router()

const Controllers = require("../controllers/user")



router.post('/register',  Controllers.registerController)
router.post('/login',  Controllers.loginController)
//router.post('/test', Controllers.verifyToken,  Controllers.test)
//router.get('/check_email/', Controllers.checkEmailController)
//router.get('/check_password/', Controllers.checkPasswordController)

module.exports = router

