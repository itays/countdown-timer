import React, { useMemo } from "react";

type FormProps = {
  onFormSubmit(e: React.FormEvent<HTMLFormElement>): void;
};

export const Form: React.FC<FormProps> = ({ onFormSubmit }) => {
  const minDate = useMemo(() => {
    return timeToDateTimeLocal(
      (new Date().getTime() + 1000 * 60 * 2).toString()
    );
  }, []);

  return (
    <form onSubmit={onFormSubmit} className="container">
      <h1 className="text-2xl font-bold">Create a custom countdown!</h1>
      <label>
        Title
        <br />
        <input
          type="text"
          name="title"
          placeholder="What are you counting down to?"
          required
        />
      </label>

      <label>
        Select a date
        <br />
        <input type="datetime-local" name="date" min={minDate} required />
      </label>

      <button className="btn_blue" type="submit">
        Submit
      </button>
    </form>
  );

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }
};

function timeToDateTimeLocal(time: string) {
  const date = new Date(+time);
  const day = date.getDate() < 10 ? `0${date.getDate()}` : `${date.getDate()}`;
  const month =
    date.getMonth() + 1 < 10
      ? `0${date.getMonth() + 1}`
      : `${date.getMonth() + 1}`;
  return `${date.getFullYear()}-${month}-${day}T00:00`;
}
