const db = require("../database/db")
const bcrypt = require("bcrypt")

const registerController = (req,res,next) => {

    const name = req.body.name
    const surname = req.body.surname
    const email = req.body.email
    const password = req.body.password
    
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

const checkEmailController = (req,res,next) => {
    const email = req.query.email
    const SQL_FIND_EMAIL = "SELECT * FROM user WHERE Email = ?;"
    db.query(SQL_FIND_EMAIL, email, (err, result) => {
        if(err){
            console.log(err)
            
        }else{
            console.log(result)
            res.send(result)
        }

    })
    
}

module.exports = {
    registerController,
    checkEmailController
}



