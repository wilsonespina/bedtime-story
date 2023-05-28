import { NextResponse, NextRequest } from 'next/server';
import { generateStory } from "app/controllers/openai.controller";

export async function GET(request: Request) {
  return new Response('Hello, from API!', request);
}

export async function POST(req: NextRequest, res: NextResponse) {
  const story = await generateStory(req, res);

  const myBlob = new Blob([`${story.data}`], {type: 'text/plain'});

  // let blob = new Blob(['Hello, world!'], {type: 'text/plain'});
  const myOptions = { status: 200, statusText: "Story successfully generated!" };
  const myResponse = new Response(myBlob, myOptions);

  return myResponse;
}