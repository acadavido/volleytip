import {
  faHourglass,
  faSquareMinus,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@nextui-org/react";
import { Timer } from "./timer";
import { useState } from "react";

export function Actions({ setCount }: any) {
  const [isTimerActive, setIsTimerActive] = useState<boolean>(false);
  const [isFirstTimerTriggered, setIsFirstTimerTriggered] =
    useState<boolean>(false);
  const [isSecondTimerTriggered, setIsSecondTimerTriggered] =
    useState<boolean>(false);

  return (
    <>
      <div className="flex justify-between m-auto mt-2 w-56">
        <div className="flex">
          <Button
            className="min-w-12 bg-transparent"
            style={{ color: "white" }}
            onClick={() =>
              setCount((prev: number) => (prev > 0 ? prev - 1 : prev))
            }
          >
            <FontAwesomeIcon icon={faSquareMinus} className="w-6 h-6 m-auto" />
          </Button>

          <Button
            className="min-w-12 bg-transparent"
            isDisabled={isFirstTimerTriggered}
          >
            <FontAwesomeIcon
              icon={faHourglass}
              color="white"
              className="w-6 h-6 m-auto"
              onClick={() => {
                setIsTimerActive(true);
                setIsFirstTimerTriggered(true);
              }}
            />
          </Button>
          <Button
            className="min-w-12 bg-transparent"
            isDisabled={isSecondTimerTriggered}
          >
            <FontAwesomeIcon
              icon={faHourglass}
              color="white"
              className="w-6 h-6 m-auto"
              onClick={() => {
                setIsTimerActive(true);
                setIsSecondTimerTriggered(true);
              }}
            />
          </Button>
        </div>
        <div className="mr-0">
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
