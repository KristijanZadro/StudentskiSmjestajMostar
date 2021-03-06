const db = require("../database/db")

const fs = require("fs")


const advController = async (req, res, next) => {
    for (let i = 0; i < req.files.length; i++) {
        let fileType = req.files[i].mimetype.split("/")[1]
        let newFileName = req.files[i].filename + "." + fileType
        console.log(`./uploads/${newFileName}`)
        fs.rename(
            `./uploads/${req.files[i].filename}`,
            `./uploads/${newFileName}`,
            function () {
                console.log("callback")
            }
        )
    }
    //console.log(req.body)
    const title = req.body.title
    const price = req.body.price
    const address = req.body.address
    const peopleAllowed = req.body.peopleAllowed
    const size = req.body.size
    const pets = req.body.pets == "true" ? true : false
    const balcony = req.body.balcony == "true" ? true : false
    const desc = req.body.desc
    const images = req.files.map((image) => {
        let fileType = image.mimetype.split("/")[1]
        return image.filename + '.' + fileType
    })
    const user_id = req.params.id
    const admin = req.body.admin == "true" ? true : false
    const superadmin = req.body.superadmin == "true" ? true : false
    let approved = false;
    if(admin || superadmin) approved = true

    const SQL_SELECT = "SELECT * FROM advertisement WHERE title = ?;"
    db.query(SQL_SELECT, title, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            if (result.length > 0) {
                console.log("title is already in use")
                res.send({ "title_available": false })
            } else {
                const SQL_INSERT = "INSERT INTO advertisement (title, price, address, people_allowed, size, pets, balcony, description, images, user_id,approved) VALUES (?,?,?,?,?,?,?,?,?,?,?);"
                db.query(SQL_INSERT, [title, price, address, peopleAllowed, size, pets, balcony, desc, [images.join().split(",").map(i => i).join()], user_id, approved], (err, result2) => {
                    if (err) {
                        console.log(err)
                    } else {
                        console.log(result2)
                        res.send({ "title_available": true })

                    }
                })
            }
        }
    })
}
const updateAdvControllers = (req, res, next) => {
   //console.log("update form data",req)
   //console.log(req)
    const title = req.body.title
    const price = req.body.price
    const address = req.body.address
    const peopleAllowed = req.body.peopleAllowed
    const size = req.body.size
    const pets = req.body.pets
    const balcony = req.body.balcony
    const desc = req.body.desc
    const updateImages = req.body.image
    const adv_id = req.params.id
    console.log("updateimg", updateImages)
    //const isAdmin = req.body.isAdmin == "true" ? true : false
    //await pipeline(image.stream, fs.createWriteStream(`${__dirname}/../public/uploads/${image}`))

    const SQL_SELECT = "SELECT * FROM advertisement WHERE title = ? AND advertisement_id != ?;"
    db.query(SQL_SELECT, [title, adv_id], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            if (result.length > 0) {
                console.log("title is already in use")
                res.send({ "title_available": false })
            } else {
                
                const SQL_UPDATE = "UPDATE advertisement SET title=?, price=?, address=?, people_allowed=?, size=?, pets=?, balcony=?, description=?, images=? WHERE advertisement_id=?;"
                db.query(SQL_UPDATE, [title, price, address, peopleAllowed, size, pets, balcony, desc, [updateImages.join().split(",").map(i => i).join()], adv_id], (err, result2) => {
                    if (err) {
                        console.log(err)
                    } else {
                        console.log(result2)
                        res.send({ "title_available": true })

                    }
                })
            }
        }
    })
}
const deleteImageController = (req, res, next) => {
    //console.log(req)
    const adv_id = req.params.id
    const image = req.body.clickedImage
    const images = req.body.image
    
    const SQL_DELETE_IMAGE = "UPDATE advertisement SET images=? WHERE advertisement_id=?;"
    db.query(SQL_DELETE_IMAGE, [[images.join().split(",").map(i => i).join()], adv_id], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            fs.unlink(`./uploads/${image}`, (err) => {
                if (err) console.log(err);
                console.log(image);
            })
            console.log(result)
            res.send(result)
        }
    })

}

    const uploadNewImageController = (req, res, next) => {
        console.log(req.body)
        const image = req.files
        console.log(image)
        const date = req.body.date
        console.log("dateeeeeeeeeeeee", date)
        
        //let fileType = image[0].mimetype.split("/")[1]
        //let newFileName = image[0].filename + "." + fileType
        
        let newFileName = date + image[0].originalname 
        console.log(`./uploads/${newFileName}`)
        fs.rename(
            `./uploads/${image[0].filename}`,
            `./uploads/${newFileName}`,
            function () {
                console.log("callback")
                res.send("200")
            }
        )
}

const getAdvController = (req, res, next) => {

    const SQL_SELECT = `SELECT ad.title, ad.price, ad.address, ad.people_allowed, ad.size, ad.pets, ad.balcony, ad.description, ad.images, AVG(ratings.rating) AS average, ad.approved
                        FROM advertisement ad
                        LEFT JOIN ratings ON ad.advertisement_id = ratings.id_adv WHERE ad.approved = 1
                        GROUP BY ad.title, ad.price, ad.address, ad.people_allowed, ad.size, ad.pets, ad.balcony, ad.description, ad.images;`
    db.query(SQL_SELECT, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            console.log(result)
            res.send(result)
        }
    })



}
const getAdvAdminController = (req, res, next) => {

    const SQL_SELECT = `SELECT ad.title, ad.price, ad.address, ad.people_allowed, ad.size, ad.pets, ad.balcony, ad.description, ad.images, AVG(ratings.rating) AS average, ad.approved
                        FROM advertisement ad
                        LEFT JOIN ratings ON ad.advertisement_id = ratings.id_adv WHERE ad.approved = 0
                        GROUP BY ad.title, ad.price, ad.address, ad.people_allowed, ad.size, ad.pets, ad.balcony, ad.description, ad.images;`
    db.query(SQL_SELECT, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            console.log(result)
            res.send(result)
        }
    })



}
const getAdController = (req, res, next) => {
    const title = req.body.title
    const SQL_SELECT = "SELECT * FROM advertisement WHERE title=?;"
    db.query(SQL_SELECT, title, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            console.log(result)
            res.send(result)

        }
    })



}
const ratingController = (req, res, next) => {
    const rating = req.body.rating
    const comment = req.body.comment
    const title = req.body.title
    const user_id = req.body.user_id

    const SQL_SELECT_ADV_ID = "SELECT advertisement_id FROM advertisement WHERE title=?"
    db.query(SQL_SELECT_ADV_ID, title, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            console.log(result)
            const SQL_POST_RATING = "INSERT INTO ratings (comment,rating,id_adv,id_user) VALUES (?,?,?,?);"
            db.query(SQL_POST_RATING, [comment, rating, result[0].advertisement_id, user_id], (err, result2) => {
                if (err) {
                    console.log(err)
                } else {
                    console.log(result2)
                    res.send(result2)
                }
            })

        }
    })

}
const getCommentsController = (req, res, next) => {

    const title = req.body.title

    const SQL_SELECT_ADV_ID = "SELECT advertisement_id FROM advertisement WHERE title=?;"
    db.query(SQL_SELECT_ADV_ID, title, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            console.log(result)
            const SQL_GET_COMMENTS = `SELECT r.id_ratings, r.comment,r.rating,r.id_user, u.name, u.surname 
                                    FROM ratings r 
                                    JOIN user u ON r.id_user = u.id
                                    WHERE id_adv = ?;`
            db.query(SQL_GET_COMMENTS, result[0].advertisement_id, (err, result2) => {
                if (err) {
                    console.log(err)
                } else {
                    console.log(result2)
                    res.send(result2)

                }
            })

        }
    })
}
const updateCommentController = (req,res,next) => {
    const id_rating = req.body.id_rating
    const comment = req.body.comment
    const SQL_UPDATE_COMMENT = "UPDATE ratings SET comment=? WHERE id_ratings=?;"
    db.query(SQL_UPDATE_COMMENT, [comment, id_rating], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            console.log(result)
            res.send(result)
        }
    })
}

const getMyAdsController = (req, res, next) => {

    const user_id = req.body.user_id

    const SQL_SELECT_ADV_ID = "SELECT * FROM advertisement WHERE user_id=?;"
    db.query(SQL_SELECT_ADV_ID, user_id, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            console.log(result)
            res.send(result)
        }
    })
}

const changeApprovedController = (req, res, next) => {
    const approved = req.body.approved
    const title = req.body.title

    const SQL_CHANGE_APPROVED = "UPDATE advertisement SET approved=? WHERE title=?;"
    db.query(SQL_CHANGE_APPROVED, [approved, title], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            console.log(err)
            res.send(result)

        }

    })

}

const deleteAdvController = (req, res, next) => {

    const title = req.body.title
    console.log(req.body)
    req.body.images.map((image) => {
        fs.unlink(`./uploads/${image}`, (err) => {
            if (err) throw err;
            console.log(image);
        })
    })
    const SQL_SELECT_ADV_ID = "SELECT advertisement_id FROM advertisement WHERE title=?;"
    db.query(SQL_SELECT_ADV_ID, title, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            console.log(result)
            const SQL_DELETE_RATING_ADV_ID = "DELETE FROM ratings WHERE id_adv = ?;"
            db.query(SQL_DELETE_RATING_ADV_ID, result[0].advertisement_id, (err, result2) => {
                if (err) {
                    console.log(err)
                } else {
                    console.log(result2)
                    const SQL_DELETE_ADV = "DELETE FROM advertisement WHERE title = ?;"
                    db.query(SQL_DELETE_ADV, title, (err, result3) => {
                        if (err) {
                            console.log(err)
                        } else {
                            console.log(err)
                            res.send(result3)

                        }

                    })
                }
            })

        }
    })

}


const deleteCommentController = (req, res, next) => {

    const comment_id = req.body.comment_id

    const SQL_DEL_COMM = "DELETE FROM ratings WHERE id_ratings = ?;"
    db.query(SQL_DEL_COMM, comment_id, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            console.log(result)
            res.send(result)
        }
    })
}







module.exports = {
    advController,
    getAdvController,
    getAdController,
    ratingController,
    getCommentsController,
    getMyAdsController,
    getAdvAdminController,
    changeApprovedController,
    deleteAdvController,
    updateCommentController,
    updateAdvControllers,
    deleteImageController,
    uploadNewImageController,
    deleteCommentController

}