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

// advertisement CRUD
//CREATE
router.post('/create/:id', upload.array("myImage", 5), Controllers.advController)
//READ
router.get('/getAdv', Controllers.getAdvController)
router.get('/getAdvAdmin', Controllers.getAdvAdminController)
router.post('/getAd', Controllers.getAdController)
router.post('/getMyAd', Controllers.getMyAdsController)
//UPDATE
router.put('/updateAdv/:id', Controllers.updateAdvControllers)
router.put('/changeApproved', Controllers.changeApprovedController)
router.put('/deleteImage/:id', Controllers.deleteImageController)
//DELETE
router.delete('/deleteAdv', Controllers.deleteAdvController)

// ratings CRUD
//CREATE
router.post('/rating', Controllers.ratingController)
//READ
router.post('/getComments', Controllers.getCommentsController)
//UPDATE
router.put('/updateComment', Controllers.updateCommentController)
//DELETE
router.delete('/deleteComment', Controllers.deleteCommentController)

// OTHERS
router.post('/uploadNewImage', upload.array("newImage",1), Controllers.uploadNewImageController)
 

module.exports = router