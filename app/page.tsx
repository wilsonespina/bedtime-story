'use client';

import { useState, useEffect } from 'react';
import ClientSection from './components/client-section/ClientSection';
import Form from './components/form/Form.jsx';
import styles from './page.module.scss';

let controller = null;

export default async function Index() {

  const [story, setStory] = useState('PLACEHOLDER TEXT');

  // async function generateStoryRequest(prompt: string) {
  //   controller = new AbortController();
  //   const signal = controller.signal;
  
  //   try {
  //     // showSpinner();
  
  //     // const response = await fetch('https://api.openai.com/v1/images/generations', {
  //     const response = await fetch('/api/generate', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         prompt
  //       }),
  //       signal,
  //     });

  //     // Read the response as a stream of data
  //     const reader = response.body.getReader();
  //     const decoder = new TextDecoder("utf-8");
  //     // resultText.innerText = "";


  //     // eslint-disable-next-line no-constant-condition
  //     while (true) {
  //       const { done, value } = await reader.read();
  //       if (done) {
  //         break;
  //       }
  //       // Massage and parse the chunk of data
  //       const chunk = decoder.decode(value);
  //       const lines = chunk.split("\n");
  //       const parsedLines = lines
  //         .map((line) => line.replace(/^data: /, "").trim()) // Remove the "data: " prefix
  //         .filter((line) => line !== "" && line !== "[DONE]") // Remove empty lines and "[DONE]"
  //         .map((line) => JSON.parse(line)); // Parse the JSON string
  
  //       for (const parsedLine of parsedLines) {
  //         const { choices } = parsedLine;
  //         const { text } = choices[0];
  //         // Update the UI with the new content
  //         if (text) {
  //           console.log("🚀 ~ file: page.tsx:59 ~ generateStoryRequest ~ content:", text)

  //           setStory((prev) => {
  //             // console.log("🚀 ~ file: page.tsx:61 ~ setStory ~ prev:", prev)
  //             // console.log("🚀 ~ file: page.tsx:64 ~ setStory ~ text:", text)
  //             return `${prev}${text}`
  //           });
  //           console.log(">>>>>>>🚀 ~ file: page.tsx:65 ~ setStory ~ story:", story)
  //         }
  //       }
  //     }
  
  //    } catch (error) {
  //       // Handle fetch request errors
  //       if (signal.aborted) {
  //         setStory('Request aborted.')
  //       } else {
  //         console.error("Error:", error);
  //         setStory('Error occurred while generating..')
  //       }
  //     } finally {
  //       // Enable the generate button and disable the stop button
  //       // generateBtn.disabled = false;
  //       // stopBtn.disabled = true;
  //       controller = null; // Reset the AbortController instance
  //     }
  // }

  // const handleSubmit = async(event : React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();

  //   const TEST_PROMPT = `You are a professional story teller who can tell kid's stories. Can you make up a bedtime story for a 2-year old called Zadie. Can it include the following: fairies, a unicorn, a bee and a crab. Can the moral of the story be to always try your hardest and be a good person? Can the story last for 10 minutes?`

  //   // await generateStoryRequest(TEST_PROMPT);
  // }

  return (
      <>
        <main className="flex min-h-screen w-full flex-col items-center justify-center gap-4 text-center">
          <h1 className="my-4 text-6xl font-bold">Bedtime Story generator</h1>
          <div className="flex flex-col items-center gap-2 font-mono md:flex-row">
            <div className="bg-neuborder-neutral-900 flex h-8 w-8 items-center justify-center rounded-full bg-neutral-900 dark:bg-white">
              <div className="text-2xl text-neutral-50 dark:text-neutral-900">
                1
              </div>
            </div>
            <p className="font-bold">
              Ask a question.
              <span className="text-neutral-400">(Max. 200 characters)</span>
            </p>
          </div>
          <ClientSection />
        </main>

      </>

  );
}
