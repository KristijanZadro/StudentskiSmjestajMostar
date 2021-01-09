const db = require("../database/db")

const advController = (req,res,next) => {

    const title = req.body.title
    const price = req.body.price
    const address = req.body.address
    const people_allowed = req.body.people_allowed
    const size = req.body.size
    const pets = req.body.pets
    const balcony = req.body.balcony
    const description = req.body.description

    const SQL_INSERT = "INSERT INTO advertisement (title, price, address, people_allowed, size, pets, balcony, description) VALUES (?,?,?,?,?,?,?,?);"
        db.query(SQL_INSERT, [title, price, address, people_allowed, size, pets, balcony, description], (err, result) => {
            if(err){
                console.log(err)
            }else{
                console.log(result)
                res.send(result)
                
            }
        })

}


module.exports = {
    advController,

}