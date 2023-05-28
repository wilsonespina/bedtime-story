'use client';

import { useState, useEffect } from 'react';
import Form from './components/Form/Form.tsx';
import styles from './page.module.scss';

let controller = null;

export default async function Index() {

  const [story, setStory] = useState('PLACEHOLDER TEXT');

  async function generateStoryRequest(prompt: string) {
    controller = new AbortController();
    const signal = controller.signal;
  
    try {
      // showSpinner();
  
      // const response = await fetch('https://api.openai.com/v1/images/generations', {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt
        }),
        signal,
      });

      // Read the response as a stream of data
      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      // resultText.innerText = "";


      // eslint-disable-next-line no-constant-condition
      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          break;
        }
        // Massage and parse the chunk of data
        const chunk = decoder.decode(value);
        const lines = chunk.split("\n");
        const parsedLines = lines
          .map((line) => line.replace(/^data: /, "").trim()) // Remove the "data: " prefix
          .filter((line) => line !== "" && line !== "[DONE]") // Remove empty lines and "[DONE]"
          .map((line) => JSON.parse(line)); // Parse the JSON string
  
        for (const parsedLine of parsedLines) {
          const { choices } = parsedLine;
          const { text } = choices[0];
          // Update the UI with the new content
          if (text) {
            console.log("🚀 ~ file: page.tsx:59 ~ generateStoryRequest ~ content:", text)

            setStory((prev) => {
              // console.log("🚀 ~ file: page.tsx:61 ~ setStory ~ prev:", prev)
              // console.log("🚀 ~ file: page.tsx:64 ~ setStory ~ text:", text)
              return `${prev}${text}`
            });
            console.log(">>>>>>>🚀 ~ file: page.tsx:65 ~ setStory ~ story:", story)
          }
        }
      }
  
     } catch (error) {
        // Handle fetch request errors
        if (signal.aborted) {
          setStory('Request aborted.')
        } else {
          console.error("Error:", error);
          setStory('Error occurred while generating..')
        }
      } finally {
        // Enable the generate button and disable the stop button
        // generateBtn.disabled = false;
        // stopBtn.disabled = true;
        controller = null; // Reset the AbortController instance
      }
  }

  const handleSubmit = async(event : React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const TEST_PROMPT = `You are a professional story teller who can tell kid's stories. Can you make up a bedtime story for a 2-year old called Zadie. Can it include the following: fairies, a unicorn, a bee and a crab. Can the moral of the story be to always try your hardest and be a good person? Can the story last for 10 minutes?`

    await generateStoryRequest(TEST_PROMPT);
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
