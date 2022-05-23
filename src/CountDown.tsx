import React, { useEffect, useState } from "react";

type CountDownProps = {
  onReset(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void;
  date: number;
  title: string;
};
type TimesState = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};
export const CountDown: React.FC<CountDownProps> = (props) => {
  const { onReset, title, date } = props;
  const [times, setTimes] = useState<TimesState>();
  useEffect(() => {
    const interval = setInterval(() => {
      const second = 1000;
      const minute = second * 60;
      const hour = minute * 60;
      const day = hour * 24;
      const distance = date - new Date().getTime();
      const newTimes: TimesState = {
        days: Math.floor(distance / day),
        hours: Math.floor((distance % day) / hour),
        minutes: Math.floor((distance % hour) / minute),
        seconds: Math.floor((distance % minute) / second),
      };
      setTimes(newTimes);
    }, 1000);
    return () => clearInterval(interval);
  }, [date]);
  return (
    <div className="countdown container">
      <h1 className="text-3xl font-bold">Countdown to {title}</h1>
      <ul className="flex p-0 sm:p-8 font-['Roboto']">
        <li className="p-2 sm:p-4 text-xl sm:text-2xl uppercase">
          <div className="text-5xl sm:text-7xl text-center">{times?.days}</div>
          Days
        </li>
        <li className="p-2 sm:p-4 text-xl sm:text-2xl uppercase">
          <div className="text-5xl sm:text-7xl text-center">{times?.hours}</div>
          Hours
        </li>
        <li className="p-2 sm:p-4 text-xl sm:text-2xl uppercase">
          <div className="text-5xl sm:text-7xl text-center">
            {times?.minutes}
          </div>
          Minutes
        </li>
        <li className="p-2 sm:p-4 text-xl sm:text-2xl uppercase">
          <div className="text-5xl sm:text-7xl text-center">
            {times?.seconds}
          </div>
          Seconds
        </li>
      </ul>
      <button onClick={onReset} className="btn_blue">
        Reset
      </button>
    </div>
  );
};
