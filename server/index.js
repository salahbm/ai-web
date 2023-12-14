import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './mongoDb/connect.js';
import daleRoutes from './routes/daleRoutes.js';



dotenv.config();

const app = express()

app.use(cors)
app.use(express.json({
    limit: '50mb'
}))


// app.use('api/v1/post', postRoutes)
app.use('api/v1/dalle', daleRoutes)

app.get('/', async (req, res) => {
    res.send('Hello from server')
})


const serverStart = async () => {
    try {
        await connectDB(process.env.MONGODB_URL)
    } catch (error) {
        console.log(error);
    }
    app.listen(8080, () => console.log('Server is running on http//:localhost:8080'))
}

serverStart()