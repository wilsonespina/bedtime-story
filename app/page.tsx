import Form from './components/form/form';
import styles from './page.module.scss';

export default async function Index() {

  return (
    <div className="page">
      <section>
        <h1>Bedtime Story generator</h1>
        <p>Welcome to the story generator, fill in the details below to generate a bedtime story</p>
      </section>

      <Form />

    </div>
  );
}
