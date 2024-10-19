import { useState, useEffect } from "react";

interface TimerProps {
  isTimerActive: boolean;
  setIsTimerActive: (value: boolean) => void;
}

export function Timer({ isTimerActive, setIsTimerActive }: TimerProps) {
  const [seconds, setSeconds] = useState(30);

  useEffect(() => {
    let timerId: ReturnType<typeof setInterval>;

    if (isTimerActive && seconds > 0) {
      timerId = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    } else if (seconds === 0) {
      setIsTimerActive(false);
      setSeconds(30);
    }

    return () => clearInterval(timerId);
  }, [isTimerActive, seconds, setIsTimerActive]);

  return (
    <div>
      <h1 className="text-3xl" style={{ color: "white" }}>
        {seconds}
      </h1>
    </div>
  );
}
