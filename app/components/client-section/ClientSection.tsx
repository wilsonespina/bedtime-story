"use client";

// import styles from './client-section.module.css';

import { useState } from "react";

export default function ClientSection() {
  const [name, setName] = useState('');
  const [minutes, setMinutes] = useState<number | string>(5);
  const [storyDetails, setStoryDetails] = useState([]);
  const [moral, setMoral] = useState('');


  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<string>("");

  const detailsSting = (details: [string]) => details.join(', ') ?? '';

  const prompt = `Q:
    Can you make up a bedtime story for a 2-year old called ${name}. Can it include: ${detailsSting(storyDetails)}? Can the moral of the story be ${moral}? Can the story last for ${minutes} minutes?
    Generate a response with less than 3000 characters.`;

    const generateResponse = async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      setResponse("");
      setLoading(true);

      const DATA = {storyDetails}
      console.log("🚀 ~ file: ClientSection.tsx:29 ~ generateResponse ~ DATA:", DATA)
      console.log("🚀 ~ file: ClientSection.tsx:22 ~ ClientSection ~ prompt:", prompt)

    // const response = await fetch("/api/generate", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     prompt,
    //   }),
    // });

    // if (!response.ok) {
    //   throw new Error(response.statusText);
    // }

    // // This data is a ReadableStream
    // const data = response.body;
    // if (!data) {
    //   return;
    // }

    // const reader = data.getReader();
    // const decoder = new TextDecoder();
    // let done = false;

    // while (!done) {
    //   const { value, done: doneReading } = await reader.read();
    //   done = doneReading;
    //   const chunkValue = decoder.decode(value);
    //   setResponse((prev) => prev + chunkValue);
    // }
    setLoading(false);
  };

  const handleCheckbox = (previousState, event:Event) => {
    const val = event.target.value;
    console.log("🚀 ~ file: ClientSection.tsx:67 ~ handleCheckbox ~ val:", val)
    console.log("🚀 ~ file: ClientSection.tsx:69 ~ handleCheckbox ~ event.target.checked:", event.target.checked)
    console.log("🚀 ~ file: ClientSection.tsx:70 ~ handleCheckbox ~ previousState:", previousState)
    if (!previousState.includes(val) && event.target.checked) return [...previousState, val];
    return previousState;
  }



  return (
    <div className="w-full max-w-xl">
      <form>
        <div className="focus:ring-neu w-full flex">
          <label htmlFor="name">Child&apos;s name:</label>
          <input type="text" name="name" placeholder="Enter your child's name" onChange={e => setName(e.target.value)}/>
        </div>

        <div className="focus:ring-neu w-full flex">
          <label htmlFor="minutes">Number of minutes (5-30):</label>
          <input type="number" id="minutes" name="minutes" min="5" max="30" step={5} defaultValue={5} onChange={e => setMinutes(Number(e.target.value))}></input>
        </div>

        <div className="focus:ring-neu w-full flex">
          <fieldset>
            <legend>Choose elements for the fairytale:</legend>

            <div className="focus:ring-neu w-full flex">
              <input type="checkbox" id="fairies" name="elements" value="fairies" onChange={e => setStoryDetails((prev) => handleCheckbox(prev, e))} />
              <label htmlFor="fairies">Fairies</label>
            </div>

            <div className="focus:ring-neu w-full flex">
              <input type="checkbox" id="unicorn" name="elements" value="unicorn" onChange={e => setStoryDetails((prev) => handleCheckbox(prev, e))} />
              <label htmlFor="unicorn">Unicorn</label>
            </div>

            <div className="focus:ring-neu w-full flex">
              <input type="checkbox" id="bee" name="elements" value="bee" onChange={e => setStoryDetails((prev) => handleCheckbox(prev, e))} />
              <label htmlFor="bee">Bee</label>
            </div>

            <div className="focus:ring-neu w-full flex">
              <input type="checkbox" id="mermaid" name="elements" value="mermaid" onChange={e => setStoryDetails((prev) => handleCheckbox(prev, e))} />
              <label htmlFor="mermaid">Mermaid</label>
            </div>

          </fieldset>
        </div>

        <div className="focus:ring-neu w-full flex">
          <label htmlFor="moral select">Choose a moral:</label>

          <select id="moral select" onChange={e => setMoral(e.target.value)}>
              <option value="">--Please choose an option--</option>
              <option value="Always tell the truth">Always tell the truth</option>
              <option value="Always try your hardest">Always try your hardest</option>
          </select>
        </div>

      </form>

      {!loading ? (
        <button
          className="w-full rounded-xl bg-neutral-900 px-4 py-2 font-medium text-white hover:bg-black/80"
          onClick={(e) => generateResponse(e)}
        >
          Generate Response &rarr;
        </button>
      ) : (
        <button
          disabled
          className="w-full rounded-xl bg-neutral-900 px-4 py-2 font-medium text-white"
        >
          <div className="animate-pulse font-bold tracking-widest">...</div>
        </button>
      )}
      {response && (
        <div className="mt-8 rounded-xl border bg-white p-4 shadow-md transition hover:bg-gray-100 text-left">
          {response}
        </div>
      )}
    </div>
  );
}