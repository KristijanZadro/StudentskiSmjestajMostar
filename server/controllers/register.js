const db = require("../database/db")

const registerController = (req,res) => {
    const name = req.body.name
    const surname = req.body.surname
    const email = req.body.email
    const password = req.body.password
    
    const SQL_INSERT = "INSERT INTO user (Ime, Prezime, Email, Password) VALUES (?,?,?,?);"
    db.query(SQL_INSERT, [name, surname, email, password], (err, result) => {
        if(err){
            console.log(err)
        }else{
            console.log(result)
        }
    })
}

module.exports = registerController
