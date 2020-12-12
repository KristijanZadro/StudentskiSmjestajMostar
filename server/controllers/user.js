const db = require("../database/db")
const bcrypt = require("bcrypt")

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
                res.send("email is already in use")
            }else{
                bcrypt.hash(password, 10, (err, hash) => {
                    const SQL_INSERT = "INSERT INTO user (Ime, Prezime, Email, Password) VALUES (?,?,?,?);"
                    db.query(SQL_INSERT, [name, surname, email, hash], (err, result) => {
                        if(err){
                            console.log(err)
                        }else{
                            console.log(result)
                            res.send(result)
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
    
    const SQL_FIND_EMAIL = "SELECT Password FROM user WHERE Email = ?;"
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
                        //console.log("compare:",rows)
                        if(rows){
                            res.send("login succesfull")
                        }else{
                            res.send("pass not valid")
                        }
                        
                    }
                })

            }else{
                res.send("email not valid")
            }
            //console.log(result)
            //res.send(result)
        }

    })
}

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
    loginController
    //checkEmailController,
    //checkPasswordController
}



