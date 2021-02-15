const express = require("express")
const router = express.Router()

const multer = require('multer');
//const path = require('path');

const Controllers = require("../controllers/adv")

const upload = multer({
    dest: "./uploads",
    limits: {
        fieldSize: 1024 * 512,
        fieldNameSize: 200
    }
  })
     
    
router.post('/create/:id', upload.array("myImage", 5), Controllers.advController)
router.get('/getAdv', Controllers.getAdvController)
router.get('/getAdvAdmin', Controllers.getAdvAdminController)
router.post('/getAd', Controllers.getAdController)
router.post('/rating', Controllers.ratingController)
router.post('/getComments', Controllers.getCommentsController)
router.post('/getMyAd', Controllers.getMyAdsController)
router.put('/changeApproved', Controllers.changeApprovedController)
router.delete('/deleteAdv', Controllers.deleteAdvController)
router.put('/updateComment', Controllers.updateCommentController)
router.put('/updateAdv/:id', Controllers.updateAdvControllers)
router.put('/deleteImage/:id', Controllers.deleteImageController)
router.post('/uploadNewImage', upload.array("newImage",1), Controllers.uploadNewImageController)
 

module.exports = router