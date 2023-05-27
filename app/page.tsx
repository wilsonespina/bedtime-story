'use client';

import styles from './page.module.scss';

export default async function Index() {

  const handleSubmit = (event : React.FormEvent<HTMLFormElement>) : void => {
    event.preventDefault();
    console.log('handleSubmit>>>>')
  }

  return (
    <div className='page'>
      <h1>Bedtime Story generator</h1>
      <p>Welcome to the story generator, fill in the details below to generate a bedtime story</p>


      <form action="" onSubmit={handleSubmit} className='form'>
        <label htmlFor="name">Child&apos;s name</label>
        <input type="text" name="name" placeholder="Enter your child's name" />


        <label htmlFor="minutes">Number of minutes (5-30):</label>
        <input type="number" id="minutes" name="minutes" min="5" max="30" step={5}></input>


        {/* <button>Create Story</button> */}
        <input type="submit" value="Create Story" />

      </form>
    </div>
  );
}
