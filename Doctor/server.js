const express  = require('express')
const morgan = require('morgan')
const dotenv = require('dotenv')
const connectDB = require('./config/db')

dotenv.config()


connectDB()



const app = express()

//middlewares
app.use(express.json())
app.use(morgan('dev'))


//routes
app.use('/api/v1/user' , require('./routes/userRoutes'))

const port = process.env.PORT || 5000

app.listen(port , ()=>{
    console.log(`Server ruuning on port ${port}`)
})

