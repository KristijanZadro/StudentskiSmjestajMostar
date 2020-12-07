const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const mysql = require("mysql")

const app = express()

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "ReactMysql1233",
    database: "ssmproject",
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

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))