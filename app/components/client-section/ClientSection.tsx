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
    Generate a response with less than 3000 characters.`; // TODO - memoize
    
    const generateResponse = async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      setResponse("");
      setLoading(true);

    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
      }),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    // This data is a ReadableStream
    const data = response.body;
    if (!data) {
      return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      setResponse((prev) => prev + chunkValue);
    }
    setLoading(false);
  };

  const handleCheckbox = (previousState, event) => {
    if (!previousState.includes(event.target.value) && event.target.checked) return [...previousState, event.target.value];
    if (!event.target.checked) {
      const state = previousState.filter((prev) => {
        return prev !== event.target.value;
      });
      return state;
    }
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
              <input type="checkbox" id="bees" name="elements" value="bees" onChange={e => setStoryDetails((prev) => handleCheckbox(prev, e))} />
              <label htmlFor="bees">Bees</label>
            </div>

            <div className="focus:ring-neu w-full flex">
              <input type="checkbox" id="mermaid" name="elements" value="mermaid" onChange={e => setStoryDetails((prev) => handleCheckbox(prev, e))} />
              <label htmlFor="mermaid">Mermaid</label>
            </div>

            <div className="focus:ring-neu w-full flex">
              <input type="checkbox" id="trains" name="elements" value="trains" onChange={e => setStoryDetails((prev) => handleCheckbox(prev, e))} />
              <label htmlFor="trains">Trains</label>
            </div>

            <div className="focus:ring-neu w-full flex">
              <input type="checkbox" id="cars" name="elements" value="cars" onChange={e => setStoryDetails((prev) => handleCheckbox(prev, e))} />
              <label htmlFor="cars">Cars</label>
            </div>

            <div className="focus:ring-neu w-full flex">
              <input type="checkbox" id="dinosaurs" name="elements" value="dinosaurs" onChange={e => setStoryDetails((prev) => handleCheckbox(prev, e))} />
              <label htmlFor="dinosaurs">Dinosaurs</label>
            </div>

          </fieldset>
        </div>

        <div className="focus:ring-neu w-full flex">
          <label htmlFor="moral select">Choose a moral:</label>

          <select id="moral select" onChange={e => setMoral(e.target.value)}>
              <option value="">--Please choose an option--</option>
              <option value="Don&apos;t be greedy, be content with what you have.">Don&apos;t be greedy, be content with what you have.</option>
              <option value="Beauty comes in all shades">Beauty comes in all shades.</option>
              <option value="Think before you act.">Think before you act..</option>
              <option value="Hurtful words cause hurt feelings; Be yourself">Always tell the truth because a liar won&apos;t be trusted..</option>
              <option value="Hurtful words cause hurt feelings; Be yourself">Hurtful words cause hurt feelings; Be yourself</option>
              <option value="Where there is a will, there is a way.">Where there is a will, there is a way.</option>
              <option value="Never give up.">Never give up.</option>
              <option value=" Knowledge without common sense is useless."> Knowledge without common sense is useless.</option>
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