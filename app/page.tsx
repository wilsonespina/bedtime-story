'use client';

import { useState } from 'react';
import Form from './components/Form/Form.tsx';
import styles from './page.module.scss';

async function generateStoryRequest(prompt: string) {
  try {
    // showSpinner();

    // const response = await fetch('https://api.openai.com/v1/images/generations', {
    fetch('/api/story', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt
      }),
    })
    .then((response) => response.body)
    .then((body) => {
      const reader = body?.getReader();
      return new ReadableStream({
        start(controller) {
          return pump();
          function pump() {
            return reader.read().then(({ done, value }) => {
              // When no more data needs to be consumed, close the stream
              if (done) {
                controller.close();
                return;
              }
              // Enqueue the next data chunk into our target stream
              controller.enqueue(value);
              return pump();
            });
          }
        },
      });
    })
      // Create a new response out of the stream
    .then((stream) => new Response(stream))
    // Create an object URL for the response
    .then((response) => response.blob())



    .then(async(blob) => console.log(">>>>> BLOB >>>>>>", await blob.text()))
    // Update image
    .catch((err) => console.error(err));

    // if (!response.ok) {
    //   removeSpinner();
    //   throw new Error('That image could not be generated');
    // }

    // const data = await response.json();
    // console.log("🚀 ~ file: form.tsx:34 ~ data:", data)

    // https://developer.mozilla.org/en-US/docs/Web/API/Streams_API/Using_readable_streams


    // console.log("======response:", response)
    // return response;

  } catch (error) {
    console.log("🚀 ~ file: form.tsx:37 ~ error:", error)

  }
}

export default async function Index() {

  const [story, setStory] = useState('');

  const handleSubmit = async(event : React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const TEST_PROMPT = `You are a professional story teller who can tell kid's stories. Can you make up a bedtime story for a 2-year old called Zadie. Can it include the following: fairies, a unicorn, a bee and a crab. Can the moral of the story be to always try your hardest and be a good person? Can the story last for 10 minutes?`

    const story = await generateStoryRequest(TEST_PROMPT);
    console.log("🚀 ~ file: page.tsx:48 ~ handleSubmit ~ story:", story)

    if (story) {
      setStory(story)
    }

  }

  return (
    <div className="page">
      <section>
        <h1>Bedtime Story generator</h1>
        <p>Welcome to the story generator, fill in the details below to generate a bedtime story</p>
      </section>

      <Form handleSubmit={handleSubmit} />

      <p>{story}</p>

    </div>
  );
}
