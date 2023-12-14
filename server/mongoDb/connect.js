import mongoose from "mongoose";


const connectDB = async (url) => {
    mongoose.set('strictQuery', true)

    mongoose.connect(url).then(() => {
        console.log('MongoDB is connected')
    }).catch((err) => {
        console.log(err.message)
    })

}

export default connectDB