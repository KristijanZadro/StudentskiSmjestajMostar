const express = require("express")

const router = express.Router()

router.post('/register', (req,res) => {
    const name = req.body.data.name
    const surname = req.body.data.surname
    const email = req.body.data.email
    const password = req.body.data.password
    
    const SQL_INSERT = "INSERT INTO user (Ime, Prezime, Email, Password) VALUES (?,?,?,?);"
    db.query(SQL_INSERT, [name, surname, email, password], (err, result) => {
        if(err){
            console.log(err)
        }else{
            console.log(result)
        }
    })
})

module.exports = router

