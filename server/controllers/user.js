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
                    const SQL_INSERT = "INSERT INTO user (Ime, Prezime, Email, Password) VALUES (?,?,?,?);"
                    db.query(SQL_INSERT, [name, surname, email, hash], (err, result) => {
                        if(err){
                            console.log(err)
                        }else{
                            console.log(result)
                            res.send({"email_available": true})
                        }
                    })
                })
            }
            
            
        }

    })

}
const loginController = (req,res) => {
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
                            res.header('auth-token-ssm', token).send({token: token, "password": rows, "email_exist": true })
                            //res.send("login succesfull")
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
    //test
    //checkEmailController,
    //checkPasswordController
}



