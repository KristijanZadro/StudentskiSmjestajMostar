const express = require("express")
const bodyParser = require("body-parser")
const mysql = require("mysql")
const cors = require("cors")

const dotenv = require("dotenv")

//const registerRoute = require("./routes/register")

const app = express()

dotenv.config();

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: process.env.DB_PASSWORD,
    database: process.env.DB,
    port: "3306"
})

app.use(bodyParser.json({extended: true}))
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())

db.connect(err => {
    if(!err){
        console.log("connected")
    }else{
        throw err
    }
})

app.post('/api/register', (req,res) => {
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
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))