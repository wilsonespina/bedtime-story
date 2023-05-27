import styles from './page.module.scss';

export default async function Index() {
  return (
    <div>
      <h1>Bedtime Story generator</h1>
      <p>Welcome to the story generator, fill in the details below to generate a bedtime story</p>


    <form action="">
      <label htmlFor="name">Child&apos;s name</label>
      <input type="text" name="name" placeholder="Enter your child's name" />


      <button>Create Story</button>

    </form>
    </div>
  );
}
