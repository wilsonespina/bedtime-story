import { OpenAIStream, OpenAIStreamPayload } from "../../utils/openAIStream";

if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missing env var from OpenAI");
}

export const runtime = 'nodejs';

export async function POST(req: Request): Promise<Response> {
  const { prompt } = (await req.json()) as {
    prompt?: string;
  };

  if (!prompt) {
    return new Response("No prompt in the request", { status: 400 });
  }

  const payload: OpenAIStreamPayload = {
    model: "gpt-3.5-turbo",
    // model: 'text-davinci-003',
    messages: [
      { role: 'user', content: prompt },
      { role: 'system', content: 'You are a professional story teller who can tell kid\'s stories.'},
    ],
    temperature: 0.7,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 3000,
    stream: true,
    n: 1,
  };

  const stream = await OpenAIStream(payload);
  return new Response(stream);
}


/* 

Can you make up a bedtime story for a 2-year old called Zadie. Can it include: fairies, a unicorn, a bee and a crab. Can the moral of the story be to always try your hardest and be a good person? Can the story last for 10 minutes?

Can you make up a bedtime story for a 2-year old called Zadie. Can it include: fairies and a unicorn? Can the moral of the story be to not lie like the boy who cried wolf? Can the story last for 10 minutes?


*/