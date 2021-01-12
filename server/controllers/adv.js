const db = require("../database/db")

const advController = (req,res,next) => {

    const title = req.body.title
    const price = req.body.price
    const address = req.body.address
    const peopleAllowed = req.body.peopleAllowed
    const size = req.body.size
    const pets = req.body.pets
    const balcony = req.body.balcony
    const desc = req.body.desc


    const SQL_SELECT = "SELECT * FROM advertisement WHERE title = ?;"
    db.query(SQL_SELECT, title , (err,result) => {
        if(err){
            console.log(err)
        }else{
            if(result.length > 0){
                console.log("title is already in use")
                res.send({"title_available": false})
            }else{
                const SQL_INSERT = "INSERT INTO advertisement (title, price, address, people_allowed, size, pets, balcony, description) VALUES (?,?,?,?,?,?,?,?);"
                db.query(SQL_INSERT, [title, price, address, peopleAllowed, size, pets, balcony, desc], (err, result) => {
                    if(err){
                        console.log(err)
                    }else{
                        console.log(result)
                        res.send({"title_available": true})
                        
                    }
                })
            }
            
        }
    })

    

}

const getAdvController = (req,res,next) => {

    const SQL_SELECT = "SELECT * FROM advertisement;"
    db.query(SQL_SELECT, (err,result) => {
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
    getAdvController

}