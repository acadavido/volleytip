import {
  faHourglass,
  faSquareMinus,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@nextui-org/react";
import { Timer } from "./timer";
import { useEffect, useState } from "react";

interface ActionsProps {
  setCount: (value: (prev: number) => number) => void;
  isReset: boolean;
}

export function Actions({ setCount, isReset }: ActionsProps) {
  const [isTimerActive, setIsTimerActive] = useState<boolean>(false);
  const [isFirstTimerTriggered, setIsFirstTimerTriggered] =
    useState<boolean>(false);
  const [isSecondTimerTriggered, setIsSecondTimerTriggered] =
    useState<boolean>(false);

  const handleTimerReset = () => {
    setIsFirstTimerTriggered(false);
    setIsSecondTimerTriggered(false);
    setIsTimerActive(false);
  };

  useEffect(() => {
    isReset && handleTimerReset();
  }, [isReset]);

  return (
    <>
      <div className="flex justify-between mt-2 w-32 sm:w-52 md:w-56">
        <Button
          className="w-1/4 bg-transparent min-w-0"
          style={{ color: "white" }}
          onClick={() =>
            setCount((prev: number) => (prev > 0 ? prev - 1 : prev))
          }
        >
          <FontAwesomeIcon
            icon={faSquareMinus}
            className="w-4 h-4 sm:w-6 sm:h-6 m-auto"
          />
        </Button>

        <Button
          className="w-1/4 bg-transparent min-w-0"
          isDisabled={isFirstTimerTriggered}
          disabled={isTimerActive}
        >
          <FontAwesomeIcon
            icon={faHourglass}
            color="white"
            className="w-4 h-4 sm:w-6 sm:h-6 m-auto"
            onClick={() => {
              setIsTimerActive(true);
              setIsFirstTimerTriggered(true);
            }}
          />
        </Button>
        <Button
          className="w-1/4 bg-transparent min-w-0"
          isDisabled={isSecondTimerTriggered}
          disabled={isTimerActive}
        >
          <FontAwesomeIcon
            icon={faHourglass}
            color="white"
            className="w-4 h-4 sm:w-6 sm:h-6 m-auto"
            onClick={() => {
              setIsTimerActive(true);
              setIsSecondTimerTriggered(true);
            }}
          />
        </Button>
        <div className="w-1/4">
          {isTimerActive && (
            <Timer
              isTimerActive={isTimerActive}
              setIsTimerActive={setIsTimerActive}
            />
          )}
        </div>
      </div>
    </>
  );
}
