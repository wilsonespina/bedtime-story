import { Configuration, OpenAIApi } from 'openai';
const { OPENAI_API_KEY } = process.env;

const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);


export const generateStory = async (req, res) => {

    try {
      const data = await req.json();
      const { prompt } = data;
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt,
        max_tokens: 4, // TODO - update to max
        temperature: 0,
      });
      const generatedStory = response.data.choices[0].text;

      return generatedStory;


    } catch (error) {

      if (error.response) {
        console.log(error.response.status);
        console.log(error.response.data);
      } else {
        console.log(error.message);
      }
  
      // res.status(400).json({
      //   success: false,
      //   error: 'The image could not be generated',
      // });
    }

}

export const generateImage = async (req, res) => {
  const { prompt, size } = req.body;

  const imageSize =
    size === 'small' ? '256x256' : size === 'medium' ? '512x512' : '1024x1024';

  try {
    const response = await openai.createImage({
      prompt,
      n: 1,
      size: imageSize,
    });

    const imageUrl = response.data.data[0].url;

    res.status(200).json({
      success: true,
      data: imageUrl,
    });
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }

    res.status(400).json({
      success: false,
      error: 'The image could not be generated',
    });
  }
};

const methods = { generateImage, generateStory }

export default methods;
