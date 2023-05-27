'use client';
import styles from './form.module.scss';

const {
  form
} = styles;

/* eslint-disable-next-line */
export interface FormProps {
  handleSubmit: () => void
}

export function Form({ handleSubmit }: FormProps) {

  return (
    <form action="" onSubmit={handleSubmit} className={form}>
      <label htmlFor="name">Child&apos;s name:</label>
      <input type="text" name="name" placeholder="Enter your child's name" />


      <label htmlFor="minutes">Number of minutes (5-30):</label>
      <input type="number" id="minutes" name="minutes" min="5" max="30" step={5} defaultValue={5}></input>

      <input type="submit" value="Create Story" />

    </form>
  );
}

export default Form;
