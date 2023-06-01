"use client";

// import styles from './client-section.module.css';

import { useState } from "react";

export default function ClientSection() {
  const [data, setData] = useState({
    name: "",
    minutes: 5,
    age: 2,
    details: {
      storyElements: ['']
    }
  }); // TODO - add dynamic data structure
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const [response, setResponse] = useState<string>("");

  const prompt = `Q: ${input} Generate a response with less than 3000 characters.`;

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

  return (
    <div className="w-full max-w-xl">
      <form>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={4}
          maxLength={1024}
          className="focus:ring-neu w-full rounded-md border border-neutral-400
          p-4 text-neutral-900 shadow-sm placeholder:text-neutral-400 focus:border-neutral-900"
          placeholder={"e.g. What is React?"}
        />

        <div className="focus:ring-neu w-full flex">
          <label htmlFor="name">Child&apos;s name:</label>
          <input type="text" name="name" placeholder="Enter your child's name" />
        </div>

        <div className="focus:ring-neu w-full flex">
          <label htmlFor="minutes">Number of minutes (5-30):</label>
          <input type="number" id="minutes" name="minutes" min="5" max="30" step={5} defaultValue={5}></input>
        </div>

        <div className="focus:ring-neu w-full flex">
          <fieldset>
            <legend>Choose elements for the fairytale:</legend>

            <div className="focus:ring-neu w-full flex">
              <input type="checkbox" id="fairies" name="fairies" />
              <label htmlFor="fairies">Fairies</label>
            </div>

            <div className="focus:ring-neu w-full flex">
              <input type="checkbox" id="unicorn" name="unicorn" />
              <label htmlFor="unicorn">Unicorn</label>
            </div>

            <div className="focus:ring-neu w-full flex">
              <input type="checkbox" id="bee" name="bee" />
              <label htmlFor="bee">Bee</label>
            </div>

            <div className="focus:ring-neu w-full flex">
              <input type="checkbox" id="mermaid" name="mermaid" />
              <label htmlFor="mermaid">Mermaid</label>
            </div>

          </fieldset>
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