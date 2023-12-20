import express from 'express';
import * as dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const router = express.Router();

const aiSecretKey = `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`;



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
                batch_size: '3',
            },
            headers: {
                'X-RapidAPI-Key': '2d92da69c6msh06e2749e14e4579p12dab1jsna6158b02e92c',
                'X-RapidAPI-Host': 'text-to-image7.p.rapidapi.com',
            },
        };
        const rapidApiResponse = await axios(options);
        const imageUrl = rapidApiResponse.data.data[0]; // Assuming the URL is in the first element of the array
        console.log(`file: daleRoutes.js:37 ~ imageUrl:`, imageUrl)

        res.status(200).json({
            photo: imageUrl,
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Something went wrong');
    }
});

export default router;