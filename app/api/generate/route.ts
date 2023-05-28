// import { NextResponse, NextRequest } from 'next/server';
// import { generateStory } from "app/controllers/openai.controller";


// // https://levelup.gitconnected.com/how-to-stream-real-time-openai-api-responses-next-js-13-2-gpt-3-5-turbo-and-edge-functions-378fea4dadbd
// export async function POST(req: NextRequest, res: NextResponse) {
//   const story = await generateStory(req, res);

//   const myBlob = new Blob([`${story.data}`], {type: 'text/plain'});

//   // let blob = new Blob(['Hello, world!'], {type: 'text/plain'});
//   const myOptions = { status: 200, statusText: "Story successfully generated!" };
//   const myResponse = new Response(myBlob, myOptions);

//   return myResponse;
// }


import { OpenAIStream, OpenAIStreamPayload } from "../../utils/openAIStream";

if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missing env var from OpenAI");
}

export const config = {
  runtime: "edge",
};

export async function POST(req: Request): Promise<Response> {
  const { prompt } = (await req.json()) as {
    prompt?: string;
  };

  if (!prompt) {
    return new Response("No prompt in the request", { status: 400 });
  }

  const payload: OpenAIStreamPayload = {
    model: "gpt-3.5-turbo",
    messages: [
      { role: 'user', content: prompt },
      { role: 'system', content: 'You are a professional story teller who can tell kid\'s stories.'},
    ],
    temperature: 0.7,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    // max_tokens: 1024,
    stream: true,
    n: 1,
  };

  const stream = await OpenAIStream(payload);
  return new Response(stream);
}