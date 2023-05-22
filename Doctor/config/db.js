const mongoose = require('mongoose')

const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URL)
        console.log('Databse connected')

    }
    catch(error){
        console.log(`Database error ${error}`)
    }
}
module.exports = connectDB