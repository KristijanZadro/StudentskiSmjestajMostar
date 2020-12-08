const express = require("express")

const router = express.Router()

router.post('/register', (req,res) => {
    res.send("register")
})

module.exports = router

