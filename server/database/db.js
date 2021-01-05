const mysql = require("mysql")
const dotenv = require("dotenv")

dotenv.config();

connectDatabase = () => {
    
    const db = mysql.createConnection({
                host: "localhost",
                user: "root",
                password: process.env.DB_PASSWORD,
                database: process.env.DB,
                port: "3306"
        })

        db.connect(err => {
            if(!err){
                console.log("connected")
            }else{
                throw err
            }
        })
    
    return db;
}

module.exports = connectDatabase();




