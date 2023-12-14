import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import connectDB from './mongoDb/connect.js';
import daleRoutes from './routes/daleRoutes.js';
import postRoutes from './routes/postRoutes.js'

dotenv.config();
const port = 5175;
const app = express();

app.use(cors()); 

app.use(express.json({
    limit: '50mb'
}));

app.use('/api/v1/dalle', daleRoutes);
app.use('/api/v1/posts', postRoutes);

app.get('/', async (req, res) => {
    res.send('Hello from server');
});

const serverStart = async () => {
    try {
        await connectDB(process.env.MONGODB_URL);
    } catch (error) {
        console.log(error);
    }
    app.listen(port, () => console.log(`Server is running on http://localhost:${port}`));
};

serverStart();
