const tf = require('@tensorflow/tfjs');
const mobilenet = require('@tensorflow-models/mobilenet');
const tfnode = require('@tensorflow/tfjs-node');
const fs = require('fs');

import nextConnect from 'next-connect';
import middleware from '../../../middleware/auth';
const models = require('../../../db/models/index');

const handler = nextConnect()
    .use(middleware)
    .get(async (req, res) => {
        const { body } = req;
        const { title, content } = body;
        const { user } = req;

        // Fotoğrafı oku
        const readImage = path => {
            const imageBuffer = fs.readFileSync(path);
            const tfimage = tfnode.node.decodeImage(imageBuffer);
            return tfimage;
        }

        // Fotoğrafı işleme sok
        const imageClassification = async path => {
            var currentPath = process.cwd();
            const image = readImage(currentPath + "/public/uploads/" + path);
            const mobilenetModel = await mobilenet.load();
            
            // Sonuçları al
            const predictions = await mobilenetModel.classify(image);
            console.log('Sonuçlar: ', predictions);

            // Sonuçları veritabanına kaydet
            const newPost = await models.posts.create({
                title,
                content: predictions[0].className,
                status: 1,
                userId: user.id,
              });
            return res.status(200).json({ data: predictions });
        }

        imageClassification("kedi.jpg");
    })
export default handler;
