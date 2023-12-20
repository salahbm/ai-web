import express from 'express';
import * as dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const router = express.Router();





router.route('/').get((req, res) => {
    res.send('Hello From Dall-E');
});

router.route('/').post(async (req, res) => {
    try {
        const {
            prompt
        } = req.body;
        const options = {
            method: 'GET',
            url: 'https://text-to-image7.p.rapidapi.com/',
            params: {
                prompt: prompt,
                batch_size: '1',

            },
            headers: {
                'X-RapidAPI-Key': '3c5553c3cemsh95ee38cb9f2fb6cp1ae296jsn8e2a95c4d214',
                'X-RapidAPI-Host': 'text-to-image7.p.rapidapi.com',
            },
        };
        const rapidApiResponse = await axios(options);
        const imageUrl = rapidApiResponse.data.data[0]; // Assuming the URL is in the first element of the array
        console.log(`file: daleRoutes.js:38 ~ imageUrl:`, imageUrl)

        res.status(200).json({
            photo: imageUrl,
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Something went wrong');
    }
});

export default router;