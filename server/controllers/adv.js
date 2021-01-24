const db = require("../database/db")

const fs = require("fs")


const advController = async (req,res,next) => {
    for(let i = 0; i<req.files.length; i++) {
        let fileType = req.files[i].mimetype.split("/")[1]
        let newFileName = req.files[i].filename + "." + fileType
        console.log(`./uploads/${newFileName}`)
        fs.rename(
            `./uploads/${req.files[i].filename}`,
            `./uploads/${newFileName}`,
            function(){
                console.log("callback")
                //res.send("200")
            }
        )
    }
    
    console.log(req.body)
    console.log(req.files)

    const title = req.body.title
    const price = req.body.price
    const address = req.body.address
    const peopleAllowed = req.body.peopleAllowed
    const size = req.body.size
    const pets = req.body.pets == "true" ? true : false
    const balcony = req.body.balcony == "true" ? true : false
    const desc = req.body.desc
    const images = req.files.map((image)=> {
        let fileType = image.mimetype.split("/")[1]
        return image.filename + '.' + fileType
    })
    
    
    //await pipeline(image.stream, fs.createWriteStream(`${__dirname}/../public/uploads/${image}`))

    const SQL_SELECT = "SELECT * FROM advertisement WHERE title = ?;"
    db.query(SQL_SELECT, title , (err,result) => {
        if(err){
            console.log(err)
        }else{
            if(result.length > 0){
                console.log("title is already in use")
                res.send({"title_available": false})
            }else{
               const SQL_INSERT = "INSERT INTO advertisement (title, price, address, people_allowed, size, pets, balcony, description, images) VALUES (?,?,?,?,?,?,?,?,?);"
                db.query(SQL_INSERT, [title, price, address, peopleAllowed, size, pets, balcony, desc, [images.join().split(",").map(i => i).join()]], (err, result) => {
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

    const SQL_SELECT = `SELECT ad.title, ad.price, ad.address, ad.people_allowed, ad.size, ad.pets, ad.balcony, ad.description, ad.images, AVG(ratings.rating) AS average 
                        FROM advertisement ad
                        LEFT JOIN ratings ON ad.advertisement_id = ratings.id_adv 
                        GROUP BY ad.title, ad.price, ad.address, ad.people_allowed, ad.size, ad.pets, ad.balcony, ad.description, ad.images;`
    db.query(SQL_SELECT, (err,result) => {
        if(err){
            console.log(err)
        }else{
            console.log(result)
            res.send(result)
        }
    })

    

}
const getAdController = (req,res,next) => {
    const title = req.body.title
    const SQL_SELECT = "SELECT * FROM advertisement WHERE title=?;"
    db.query(SQL_SELECT, title, (err,result) => {
        if(err){
            console.log(err)
        }else{
            console.log(result)
            res.send(result)
            
        }
    })

    

}
const ratingController = (req,res,next) => {
    const rating = req.body.rating
    const comment = req.body.comment
    const title = req.body.title
    const user_id = req.body.user_id

    const SQL_SELECT_ADV_ID = "SELECT advertisement_id FROM advertisement WHERE title=?"
    db.query(SQL_SELECT_ADV_ID, title, (err,result) => {
        if(err){
            console.log(err)
        }else{
            console.log(result)
            const SQL_POST_RATING = "INSERT INTO ratings (comment,rating,id_adv,id_user) VALUES (?,?,?,?);"
            db.query(SQL_POST_RATING, [comment,rating,result[0].advertisement_id, user_id], (err,result2) => {
                if(err){
                    console.log(err)
                }else{
                    console.log(result2)
                    res.send(result2)
                }
            })
            
        }
    })

}
const getCommentsController = (req,res,next) => {
    
    const title = req.body.title

    const SQL_SELECT_ADV_ID = "SELECT advertisement_id FROM advertisement WHERE title=?;"
    db.query(SQL_SELECT_ADV_ID, title, (err,result) => {
        if(err){
            console.log(err)
        }else{
            console.log(result)
            const SQL_GET_COMMENTS = `SELECT r.comment,r.rating, u.name, u.surname 
                                    FROM ratings r 
                                    JOIN user u ON r.id_user = u.id
                                    WHERE id_adv = ?;`
            db.query(SQL_GET_COMMENTS, result[0].advertisement_id, (err,result2) => {
                if(err){
                    console.log(err)
                }else{
                    console.log(result2)
                    res.send(result2)
                    
                }
            })
            
        }
    })
    

    

}



    

    







module.exports = {
    advController,
    getAdvController,
    getAdController,
    ratingController,
    getCommentsController
    


}