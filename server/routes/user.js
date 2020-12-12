const express = require("express")
const router = express.Router()

const Controllers = require("../controllers/user")



router.post('/register', Controllers.checkEmailController, Controllers.registerController)
router.get('/check_email/', Controllers.checkEmailController)
router.get('/check_password/', Controllers.checkPasswordController)

module.exports = router

