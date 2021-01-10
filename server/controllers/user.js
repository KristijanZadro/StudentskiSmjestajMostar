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
    
    const SQL_FIND_EMAIL = "SELECT * FROM user WHERE Email = ?;"
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
                            //console.log(result[0].id)
                            const token = jwt.sign({id: result[0].id}, process.env.TOKEN_SECRET, {expiresIn: 3600})
                            res.header('auth-token-ssm', token)
                            //res.send("login succesfull")
                            const SQL_FIND_ROLE = "SELECT id_role FROM user_role WHERE id_user = ?;"
                            db.query(SQL_FIND_ROLE, [result[0].id], (err,result_2)=> {
                                if(err){
                                    console.log(err)
                                }else{
                                    res.send({token: token, "password": rows, "email_exist": true, "role_id": result_2[0].id_role, "name": result[0].Name, "surname": result[0].Surname })
                            
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

/*const test = (req,res) => {
    res.send("post")
}
*/
/*const checkEmailController = (req,res,next) => {
    const email = req.query.email
    const SQL_FIND_EMAIL = "SELECT * FROM user WHERE Email = ?;"
    db.query(SQL_FIND_EMAIL, email, (err, result) => {
        if(result>0){
            console.log("email is already in use")
            res.send("email is already in use")
            
        }else{
            console.log(err)
            
        }

    })
    
}

const checkPasswordController = (req,res,next) => {
    const email = req.body.email
    const password = req.body.password
    
        const SQL_FIND_EMAIL = "SELECT Password FROM user WHERE Email = ?;"
        db.query(SQL_FIND_EMAIL, email, (err, result) => {
            
            if(err){
                console.log(err)
                res.send("email not valid")
                
            }else{
                if(result.length == 1){
                    bcrypt.compare(password, result[0].Password, (err,res)=> {
                        if(err){
                            console.log(err)
                            res.send("pass not valid")
                        }else{
                            console.log("compare:",res)
                            res.send("login succesfull")
                        }
                    })

                }
                console.log(result)
                res.send(result)
            }

        })
    
    
    
}
*/

module.exports = {
    registerController,
    loginController,
    verifyToken,
    roleController,
    role_id_Controller
    //test
    //checkEmailController,
    //checkPasswordController
}



