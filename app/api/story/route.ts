import { NextResponse, NextRequest } from 'next/server';
import { generateStory } from "app/controllers/openai.controller";

export async function GET(request: Request) {
  console.log('>>>>>>> HERE >>>>>>> GER')
  return new Response('Hello, from API!', request);
}

export async function POST(req: NextRequest, res: NextResponse) {
console.log("🚀 ~ file: route.ts:14 ~ POST ~ request:", req)

  const { prompt } = req.body;
  console.log("🚀 ~ file: route.ts:13 ~ POST ~ prompt:", prompt)

  const data = fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(prompt),
  });
  console.log("🚀 ~ file: route.ts:22 ~ POST ~ data:", data)

  generateStory(req, res);
  // const res = await fetch('https://api.openai.com/v1/chat/completions', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'API-Key': process.env.DATA_API_KEY,
  //   },
  //   body: JSON.stringify({ time: new Date().toISOString() }),
  // });
 
  // const data = await res.json();
 
  // return NextResponse.json(data);


  // const res = generateStory(prompt)
  // console.log("******🚀 ~ file: route.ts:32 ~ POST ~ res:", res)

  // return new Response('Hello, from API!', res);
}