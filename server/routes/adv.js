const express = require("express")
const router = express.Router()

const Controllers = require("../controllers/adv")

router.post('/create', Controllers.advController)
router.get('/getAdv', Controllers.getAdvController)

module.exports = router