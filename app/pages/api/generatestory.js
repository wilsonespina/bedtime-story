import { generateStory } from '../../controllers/openai.controller.js';

export default function handler(req, res) {
    console.log("🚀 ~ file: generatestory.ts:4 ~ handler ~ req:", req)
    if (req.method !== 'POST') {
      res.status(405).send({ message: 'Only POST requests allowed' })
      return
    }
  
  
    // not needed in NextJS v12+
    // const body = JSON.parse(req.body)
  
    // the rest of your code


    // https://api.openai.com/v1/chat/completions

    fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(objectWithData),
    })


    generateStory(req, res);


}