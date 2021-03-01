const express = require("express")
const router = express.Router()

const Controllers = require("../controllers/user")


// user CRUD
//CREATE
router.post('/register', Controllers.registerController, Controllers.roleController,)
//READ
router.post('/login',  Controllers.loginController,  )
router.get('/getUsers', Controllers.getUsersController)
router.get('/getAdmins', Controllers.getAdminsController)
//UPDATE
router.put('/ChangeNameSurname', Controllers.changeNameSurnameController)
router.put('/ChangeEmail', Controllers.changeEmailController)
router.put('/ChangePassword', Controllers.changePasswordController)
router.put('/setAdmin', Controllers.setAdminController)
router.put('/setUser', Controllers.setUserController)
//DELETE
router.delete('/deleteUser', Controllers.deleteUserController)
//OTHERS
router.get('/get_role_id', Controllers.role_id_Controller)
router.post('/getMe', Controllers.getMeController)

module.exports = router

