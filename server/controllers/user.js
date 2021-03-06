const db = require("../database/db")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const registerController = (req,res,next) => {

    const name = req.body.name
    const surname = req.body.surname
    const email = req.body.email
    const password = req.body.password

    const SQL_FIND_EMAIL = "SELECT * FROM user WHERE Email = ?;"
    db.query(SQL_FIND_EMAIL, email, (err, result) => {
        if(err){
            console.log(err)
        }else{
            if(result.length > 0){
                console.log("email is already in use")
                res.send({"email_available": false})
            }else{
                bcrypt.hash(password, 10, (err, hash) => {
                    const SQL_INSERT = "INSERT INTO user (Name, Surname, Email, Password) VALUES (?,?,?,?);"
                    db.query(SQL_INSERT, [name, surname, email, hash], (err, result) => {
                        if(err){
                            console.log(err)
                        }else{
                            console.log(result)
                            res.send({"email_available": true})
                            res.locals.email = email
                            next()
                        }
                    })
                })
            }
            
            
        }

    })

}
const roleController = (req,res,next) => {
    const SQL_FIND_EMAIL = "SELECT id FROM user WHERE Email=?;"
    db.query(SQL_FIND_EMAIL, res.locals.email, (err, result) => {
        if(err){
            console.log(err)
        }else{
            const SQL_FIND_ID_ROLE = "SELECT id_role FROM roles WHERE role_name = 'user';"
            db.query(SQL_FIND_ID_ROLE, (err, result_2) => {
                if(err){
                    console.log(err)
                }else{
                    const SQL_INSERT_ID_ROLE = "INSERT INTO user_role (id_user, id_role) VALUES (?,?);"
                    db.query(SQL_INSERT_ID_ROLE, [result[0].id, result_2[0].id_role], (err, result_3) => {
                        if(err){
                            console.log(err)
                        }else{
                            //res.send("role korisnik added.")
                            console.log(result_3)
                        }
                    })
                }
                
            })
        }
            

    })
    
}

const loginController = (req,res,next) => {
    const email = req.body.email
    const password = req.body.password
    
    const SQL_FIND_EMAIL = `SELECT u.id, u.Name, u.Surname, u.Email, u.Password, ur.id_role
                            FROM user u
                            JOIN user_role ur ON u.id = ur.id_user
                            WHERE u.Email = ?;`
    db.query(SQL_FIND_EMAIL, email, (err, result) => {
        
        if(err){
            console.log(err)
            //res.send("email not valid")
            
        }else{
            if(result.length == 1){
                
                bcrypt.compare(password, result[0].Password, (err,rows)=> {
                    if(err){
                        console.log(err)
                    }else{
                        
                        if(rows){
                            const token = jwt.sign({
                                user: result[0], 
                                }, process.env.TOKEN_SECRET, {expiresIn: 3600})
                            res.header('auth-token-ssm', token)
                            //res.send("login succesfull")
                            const SQL_FIND_ROLE = "SELECT id_role FROM user_role WHERE id_user = ?;"
                            db.query(SQL_FIND_ROLE, [result[0].id], (err,result_2)=> {
                                if(err){
                                    console.log(err)
                                }else{
                                    res.send({token: token, "password": rows, "email_exist": true, "role_id": result_2[0].id_role })
                                    res.locals.email = email
                                    next()
                            
                                }

                            })
                        }else{
                            res.send({"password": rows, "email_exist": true})
                            
                        }
                        
                    }
                })

            }else{
                res.send({"email_exist": false})
            }
            //console.log(result)
            //res.send(result)
        }

    })
}

const role_id_Controller = (req,res,next) => {
            const SQL_FIND_ID_ROLE = "SELECT * FROM roles;"
            db.query(SQL_FIND_ID_ROLE, (err, result5) => {
                if(err){
                    console.log(err)
                }else{
                    //res.send("role korisnik added.")
                    let user_role_id;
                    let superadmin_role_id;
                    let admin_role_id;
                    for(let i=0; i < result5.length; i++){
                        if(result5[i].role_name === 'user'){
                            user_role_id = result5[i].id_role
                        }else if(result5[i].role_name === 'superadmin'){
                            superadmin_role_id = result5[i].id_role
                        }else if(result5[i].role_name === 'admin'){
                            admin_role_id = result5[i].id_role
                        }
                        if(i == result5.length-1){
                            res.send({"user_role_id": user_role_id, "superadmin_role_id": superadmin_role_id,"admin_role_id": admin_role_id,})
                            console.log({"user_role_id": user_role_id, "superadmin_role_id": superadmin_role_id,"admin_role_id": admin_role_id,})
                        }
                    }
                    
                    console.log(result5)
                }
    
            })
}


const verifyToken = (req,res,next) => {
    const token = req.header('auth-token-ssm')
    if(!token) return res.status(401).send('access denied')

    try{
        const verified = jwt.verify(token, process.env.TOKEN_SECRET)
        req.user = verified
        next()
    }catch(err){
        res.status(400).send('invalid token')
    }
}


const changeNameSurnameController = (req,res,next) => {
    const newName = req.body.newName
    const newSurname = req.body.newSurname
    const user_id = req.body.user_id

    const SQL_CHANGE_NAME_SURNAME = "UPDATE user SET Name=?, Surname=? WHERE id=?;"
    db.query(SQL_CHANGE_NAME_SURNAME, [newName,newSurname,user_id], (err, result) => {
        if(err){
            console.log(err)
        }else{
            console.log(err)
            res.send(result)
            
        }

    })
    
}
const changeEmailController = (req,res,next) => {
    const newEmail = req.body.newEmail
    const user_id = req.body.user_id
    
    const SQL_CHANGE_EMAIL = "SELECT * FROM user WHERE Email = ?;"
    db.query(SQL_CHANGE_EMAIL, newEmail, (err, result) => {
        if(err){
            console.log(err)
        }else{
            if(result.length > 0){
                console.log("email is already in use")
                res.send({"email_available": false})
            }else{
                const SQL_FIND_EMAIL = "UPDATE user SET Email=? WHERE id=?;"
                db.query(SQL_FIND_EMAIL, [newEmail,user_id], (err, result2) => {
                    if(err){
                        console.log(err)
                    }else{
                        console.log(err)
                        res.send({"email_available": true})
                        
                    }
                })
            }
        }
    })
}
const changePasswordController = (req,res,next) => {
    const newPassword = req.body.newPassword
    const user_id = req.body.user_id

    bcrypt.hash(newPassword, 10, (err, hash) => {
        const SQL_CHANGE_PASSWORD = "UPDATE user SET Password=? WHERE id=?;"
        db.query(SQL_CHANGE_PASSWORD, [hash, user_id], (err, result) => {
            if(err){
                console.log(err)
            }else{
                console.log(result)
                res.send(result)
            }
        })
    })
    
}

const getUsersController = (req,res,next) => {
    const SQL_GET_USER_ROLE = "SELECT id_role FROM roles WHERE role_name = 'user';"
    db.query(SQL_GET_USER_ROLE, (err, result) => {
        if(err){
            console.log(err)
        }else{
            console.log(result)
            const SQL_GET_USER = `SELECT *
                                FROM user u
                                JOIN user_role ur ON u.id = ur.id_user
                                WHERE ur.id_role = ?;`
            db.query(SQL_GET_USER, result[0].id_role, (err, result2) => {
                if(err){
                    console.log(err)
                }else{
                    console.log(result2)
                    res.send(result2)
                }
            })
        }
    })
    
}
const getAdminsController = (req,res,next) => {
    const SQL_GET_USER_ROLE = "SELECT id_role FROM roles WHERE role_name = 'admin';"
    db.query(SQL_GET_USER_ROLE, (err, result) => {
        if(err){
            console.log(err)
        }else{
            console.log(result)
            const SQL_GET_USER = `SELECT *
                                FROM user u
                                JOIN user_role ur ON u.id = ur.id_user
                                WHERE ur.id_role = ?;`
            db.query(SQL_GET_USER, result[0].id_role, (err, result2) => {
                if(err){
                    console.log(err)
                }else{
                    console.log(result2)
                    res.send(result2)
                }
            })
        }
    })
    
}
const deleteUserController = (req,res,next) => {
    const user_id = req.body.user_id
    
    const SQL_DELETE_USER_ROLE = "DELETE FROM user_role WHERE id_user=?;"
    db.query(SQL_DELETE_USER_ROLE, user_id, (err, result) => {
        if(err){
            console.log(err)
        }else{
            const SQL_DELETE_USER = "DELETE FROM user WHERE id=?;"
            db.query(SQL_DELETE_USER, user_id, (err, result2) => {
                if(err){
                    console.log(err)
                }else{
                    console.log(err)
                    res.send(result2)
                    
                }
            })  
            
        }
    })
}
const getMeController = (req,res,next) => {
    const role_id = req.body.role_id
    const SQL_GET_ME = `SELECT role_name FROM roles WHERE id_role = ? ;`
    db.query(SQL_GET_ME, role_id, (err, result) => {
        if(err){
            console.log(err)
        }else{
            console.log(err)
            res.send(result)
        }
    })
}
const setAdminController = (req,res,next) => {
    const user_id = req.body.user_id
    const SQL_SELECT_ADMIN_ROLE = "SELECT id_role FROM roles WHERE role_name = 'admin';"
    db.query(SQL_SELECT_ADMIN_ROLE, (err, result) => {
        if(err){
            console.log(err)
        }else{
            console.log(result)
            const SQL_SET_ADMIN= "UPDATE user_role SET id_role = ? WHERE id_user = ?;"
            db.query(SQL_SET_ADMIN, [result[0].id_role, user_id], (err, result2) => {
                if(err){
                    console.log(err)
                }else{
                    console.log(result2)
                    res.send(result2)
                    
                }
            })
        }
    })
}

const setUserController = (req,res,next) => {
    const user_id = req.body.user_id
    const SQL_SELECT_USER_ROLE = "SELECT id_role FROM roles WHERE role_name = 'user';"
    db.query(SQL_SELECT_USER_ROLE, (err, result) => {
        if(err){
            console.log(err)
        }else{
            console.log(result)
            const SQL_SET_USER= "UPDATE user_role SET id_role = ? WHERE id_user = ?;"
            db.query(SQL_SET_USER, [result[0].id_role, user_id], (err, result2) => {
                if(err){
                    console.log(err)
                }else{
                    console.log(result2)
                    res.send(result2)
                    
                }
            })
        }
    })
}


module.exports = {
    registerController,
    loginController,
    verifyToken,
    roleController,
    role_id_Controller,
    changeNameSurnameController,
    changeEmailController,
    changePasswordController,
    getUsersController,
    deleteUserController,
    getMeController,
    setAdminController,
    getAdminsController,
    setUserController
}



