const express = require("express")
const router = express.Router()

const Controllers = require("../controllers/user")



router.post('/register', Controllers.registerController, Controllers.roleController,)
router.get('/get_role_id', Controllers.role_id_Controller)
router.post('/login',  Controllers.loginController,  )
router.put('/ChangeNameSurname', Controllers.changeNameSurnameController)
router.put('/ChangeEmail', Controllers.changeEmailController)

//router.get('/get_user_info', Controllers.get_name_surname_Controller)
//router.post('/test', Controllers.verifyToken,  Controllers.test)
//router.get('/check_email/', Controllers.checkEmailController)
//router.get('/check_password/', Controllers.checkPasswordController)

module.exports = router

