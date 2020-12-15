const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")

const userRoute = require("./routes/user")


const app = express()

app.use(cors())
app.use(bodyParser.json({extended: true}))
app.use(bodyParser.urlencoded({extended: true}))


app.use('/api/user', userRoute)


const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))

