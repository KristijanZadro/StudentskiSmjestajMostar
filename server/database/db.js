const mysql = require("mysql")
const dotenv = require("dotenv")

dotenv.config();

connectDatabase = () => {
    
    const db = mysql.createConnection({
                host: process.env.DB_HOST,
                user: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_DATABASE,
                port: process.env.DB_PORT   
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




