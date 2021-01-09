const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")

const userRoute = require("./routes/user")
const advRoute = require("./routes/adv")


const app = express()

app.use(cors())
app.use(bodyParser.json({extended: true}))
app.use(bodyParser.urlencoded({extended: true}))


app.use('/api/user', userRoute)
app.use('/api/adv', advRoute)


const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))

