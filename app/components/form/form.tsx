'use client';
import styles from './form.module.scss';

const {
  form
} = styles;

/* eslint-disable-next-line */
export interface FormProps {}

async function generateStoryRequest(prompt: string) {
  console.log("🚀 ~ file: form.tsx:12 ~ prompt:=========", JSON.stringify({prompt}))

  try {
    // showSpinner();

    // const response = await fetch('https://api.openai.com/v1/images/generations', {
    const response = await fetch('/api/story', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt
      }),
    });

    // if (!response.ok) {
    //   removeSpinner();
    //   throw new Error('That image could not be generated');
    // }

    // const data = await response.json();
    // console.log("🚀 ~ file: form.tsx:34 ~ data:", data)

    return response;

  } catch (error) {
    console.log("🚀 ~ file: form.tsx:37 ~ error:", error)

  }
}

export function Form(props: FormProps) {

  // const { data, error, isLoading, isValidating } = useSWR<
  //   Person,
  //   ResponseError
  // >(() => (query.id ? `/api/people/${query.id}` : null), fetcher)

    const handleSubmit = (event : React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const TEST_PROMPT = `You are a professional story teller who can tell kid's stories. Can you make up a bedtime story for a 2-year old called Zadie. Can it include the following: fairies, a unicorn, a bee and a crab. Can the moral of the story be to always try your hardest and be a good person? Can the story last for 10 minutes?`

      generateStoryRequest(TEST_PROMPT);
  }
  return (
    <form action="" onSubmit={handleSubmit} className={form}>
      <label htmlFor="name">Child&apos;s name:</label>
      <input type="text" name="name" placeholder="Enter your child's name" />


      <label htmlFor="minutes">Number of minutes (5-30):</label>
      <input type="number" id="minutes" name="minutes" min="5" max="30" step={5} defaultValue={5}></input>


      {/* <button>Create Story</button> */}
      <input type="submit" value="Create Story" />

    </form>
  );
}

export default Form;
