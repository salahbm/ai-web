import express from 'express'
import * as dotenv from 'dotenv'
import { OpenAI} from 'openai'



dotenv.config()

const router = express.Router()

const openai = new OpenAI({
    apiKey: process.env.OPENAI_KEY
})

router.route('/').get((req, res)=>{
    res.send('Hello From Dall-E')
})


router.route('/').post(async (req, res) => {
    try {
        const { prompt } = req.body;

        const response = await openai.images.generate({
            prompt: prompt,
            n: 1,
            size: '1024x1024',
            response_format: 'b64_json',
            model:'dall-e-3',
            quality:'hd'
        });

        const image = response.data.data[0].image.b64_json;

        res.status(200).json({ photo: image });
    } catch (error) {
        console.log(error.message);
    }
});


export default router;