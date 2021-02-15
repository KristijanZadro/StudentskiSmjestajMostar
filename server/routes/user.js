const express = require("express")
const router = express.Router()

const Controllers = require("../controllers/user")



router.post('/register', Controllers.registerController, Controllers.roleController,)
router.get('/get_role_id', Controllers.role_id_Controller)
router.post('/login',  Controllers.loginController,  )
router.put('/ChangeNameSurname', Controllers.changeNameSurnameController)
router.put('/ChangeEmail', Controllers.changeEmailController)
router.put('/ChangePassword', Controllers.changePasswordController)
router.get('/getUsers', Controllers.getUsersController)
router.get('/getAdmins', Controllers.getAdminsController)
router.delete('/deleteUser', Controllers.deleteUserController)
router.post('/getMe', Controllers.getMeController)
router.put('/setAdmin', Controllers.setAdminController)
router.put('/setUser', Controllers.setUserController)

//router.get('/get_user_info', Controllers.get_name_surname_Controller)
//router.post('/test', Controllers.verifyToken,  Controllers.test)
//router.get('/check_email/', Controllers.checkEmailController)
//router.get('/check_password/', Controllers.checkPasswordController)

module.exports = router

