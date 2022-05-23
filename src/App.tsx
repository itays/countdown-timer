import React, { useEffect, useState, useCallback } from "react";
import { Video } from "./Video";
import { Form } from "./Form";
import { CountDown } from "./CountDown";

const App: React.FC = () => {
  const [title, setTitle] = useState<string | null>();
  const [date, setDate] = useState<number | null>();

  useEffect(() => {
    if (!localStorage.getItem("title")) return;
    if (
      localStorage.getItem("date") &&
      parseInt(localStorage.getItem("date")!) < new Date().getTime()
    ) {
      localStorage.removeItem("title");
      localStorage.removeItem("date");
      return;
    }
    setTitle(localStorage.getItem("title")!);
    setDate(+localStorage.getItem("date")!);
  }, []);

  const onReset = useCallback(() => {
    clearStorage();
    setDate(null);
    setTitle(null);
  }, []);

  const onFormSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    const title = (e.currentTarget.title as unknown as HTMLInputElement).value;
    const newDate = new Date(
      (e.currentTarget.date as unknown as HTMLInputElement).value
    ).getTime();
    setTitle(title);
    setDate(newDate);
    localStorage.setItem("title", title);
    localStorage.setItem("date", `${newDate}`);
  }, []);

  function renderContent() {
    if (!date) {
      return <Form onFormSubmit={onFormSubmit} />;
    }
    return <CountDown onReset={onReset} date={date} title={title!} />;
  }

  return (
    <main className="flex justify-center">
      <Video />
      {renderContent()}
    </main>
  );
};

function clearStorage() {
  localStorage.removeItem("title");
  localStorage.removeItem("date");
}

export default App;
