const express = require("express")
const router = express.Router()

const multer = require('multer');
//const path = require('path');

const Controllers = require("../controllers/adv")

const upload = multer({dest: "./uploads"})
     
    
router.post('/create', upload.array("myImage", 5), Controllers.advController)
router.get('/getAdv', Controllers.getAdvController)
router.post('/getAd', Controllers.getAdController)

 

module.exports = router