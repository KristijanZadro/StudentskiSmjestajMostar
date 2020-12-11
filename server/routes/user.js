const express = require("express")
const router = express.Router()

const Controllers = require("../controllers/user")



router.post('/register', Controllers.registerController)
router.get('/check_email/', Controllers.checkEmailController)

module.exports = router

