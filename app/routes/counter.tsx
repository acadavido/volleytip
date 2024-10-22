import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolleyballBall } from "@fortawesome/free-solid-svg-icons";
import {
  faSquareMinus,
  faHourglass,
} from "@fortawesome/free-regular-svg-icons";
import { Set } from "../components/set";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { ETeam, SetDto } from "~/dtos/dtos";
import { Timer } from "~/components/timer";
import { Actions } from "~/components/actions";

export default function Counter() {
  const [localCount, setLocalCount] = useState<number>(0);
  const [visitorCount, setVisitorCount] = useState<number>(0);

  const [localSetCount, setLocalSetCount] = useState<number>(0);
  const [visitorSetCount, setVisitorSetCount] = useState<number>(0);

  const [lastPressed, setLastPressed] = useState<ETeam>();

  const [setsFinished, setSetsFinished] = useState<SetDto[]>([]);

  const [isFinishedBefore, setIsFinishedBefore] = useState<boolean>(false);
  const [teamWinnerFinishedBefore, setTeamWinnerFinishedBefore] =
    useState<ETeam>();

  const [isTimerActive, setIsTimerActive] = useState<boolean>(false);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const incrementCount = (team: ETeam) => {
    if (team === ETeam.VISITOR) {
      if (
        visitorCount < 25 ||
        (visitorCount >= 25 && Math.abs(visitorCount - localCount) <= 1)
      ) {
        setVisitorCount(visitorCount + 1);
        setLastPressed(ETeam.VISITOR);
        if (visitorCount >= 24 && visitorCount - localCount > 2) {
          onOpen();
        }
      }
    } else if (team === ETeam.LOCAL) {
      if (
        localCount < 25 ||
        (localCount >= 25 && Math.abs(visitorCount - localCount) <= 1)
      ) {
        setLocalCount(localCount + 1);
        setLastPressed(ETeam.LOCAL);

        if (localCount >= 24 && localCount - visitorCount > 2) {
          onOpen();
        }
      }
    }
  };

  const handleFinishedSet = () => {
    if (!isFinishedBefore) {
      if (lastPressed === ETeam.VISITOR) {
        setVisitorSetCount(visitorSetCount + 1);
      } else if (lastPressed === ETeam.LOCAL) {
        setLocalSetCount(localSetCount + 1);
      }
    }
    setSetsFinished([
      ...setsFinished,
      {
        local: localCount,
        visitor: visitorCount,
      },
    ]);
    setVisitorCount(0);
    setLocalCount(0);
    setIsFinishedBefore(false);
  };
  const handleNotFinishedSet = () => {
    if (!isFinishedBefore) {
      if (lastPressed === ETeam.VISITOR) {
        setVisitorCount(visitorCount - 1);
      } else if (lastPressed === ETeam.LOCAL) {
        setLocalCount(localCount - 1);
      }
    } else if (isFinishedBefore) {
      if (teamWinnerFinishedBefore === ETeam.VISITOR) {
        setVisitorSetCount(visitorSetCount - 1);
      } else if (teamWinnerFinishedBefore === ETeam.LOCAL) {
        setLocalSetCount(localSetCount - 1);
      }
    }
  };

  return (
    <main className="flex flex-wrap justify-center p-10 bg-purple-volleytip min-h-screen">
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Confirmación
              </ModalHeader>
              <ModalBody>
                <p>¿Deseas confirmar que el set se terminó?</p>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onPress={onClose}
                  onClick={handleNotFinishedSet}
                >
                  No
                </Button>
                <Button
                  color="primary"
                  onPress={onClose}
                  onClick={handleFinishedSet}
                >
                  Sí
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <div className="flex mt-32 flex flex-wrap justify-center">
        <div className="text-center w-1/5">
          <input
            className={`block text-6xl border-none font-medium focus:outline-none text-center w-full
             `}
            style={{ color: "white", backgroundColor: "transparent" }}
            name={ETeam.VISITOR}
            defaultValue="Visitor"
          />
          <Button
            className="bg-blue-volleytip text-purple-volleytip font-bold text-8xl w-full w-56 h-56 rounded relative"
            disableRipple
            onClick={() => {
              incrementCount(ETeam.VISITOR);
            }}
          >
            {visitorCount}
            <span
              className={`absolute right-2 bottom-2 transform -translate-x-1/2 w-4 h-4 ${
                lastPressed === ETeam.VISITOR ? "flex" : "hidden"
              }`}
            >
              <FontAwesomeIcon
                className="h-auto"
                color="purple-volleytip"
                icon={faVolleyballBall}
              />
            </span>
          </Button>
          <Actions setCount={setVisitorCount} />
        </div>

        <div className="text-center flex-col justify-center items-center">
          <button
            className="bg-purple-volleytip font-bold text-7xl w-20 rounded shadow hover:bg-blue-600 transition duration-300"
            style={{ color: "white" }}
            onClick={() => {
              if (visitorSetCount < 3) {
                setVisitorSetCount(visitorSetCount + 1);
                setIsFinishedBefore(true);
                setTeamWinnerFinishedBefore(ETeam.VISITOR);
                onOpen();
              }
            }}
          >
            {visitorSetCount}
          </button>

          <button
            className="mt-16 bg-purple-volleytip font-bold text-7xl w-20 rounded shadow hover:bg-blue-600 transition duration-300"
            style={{ color: "white" }}
            onClick={() => {
              if (localSetCount < 3) {
                setLocalSetCount(localSetCount + 1);
                setIsFinishedBefore(true);
                setTeamWinnerFinishedBefore(ETeam.LOCAL);
                onOpen();
              }
            }}
          >
            {localSetCount}
          </button>
          <ul>
            {setsFinished.map((set, index) => (
              <li key={index} className="flex justify-center">
                <Set key={index} local={set.local} visitor={set.visitor} />
              </li>
            ))}
          </ul>
        </div>

        <div className="text-center w-1/5">
          <input
            className={`block text-6xl border-none font-medium focus:outline-none text-center w-full
             `}
            style={{ color: "white", backgroundColor: "transparent" }}
            name={ETeam.LOCAL}
            defaultValue="Local"
          />
          <Button
            className="bg-blue-volleytip text-purple-volleytip font-bold text-8xl w-full w-56 h-56 rounded relative"
            disableRipple
            onClick={() => {
              incrementCount(ETeam.LOCAL);
            }}
          >
            {localCount}
            <span
              className={`absolute right-2 bottom-2 transform -translate-x-1/2 w-4 h-4 ${
                lastPressed === ETeam.LOCAL ? "flex" : "hidden"
              }`}
            >
              <FontAwesomeIcon
                className="h-auto"
                color="purple-volleytip"
                icon={faVolleyballBall}
              />
            </span>
          </Button>
          <Actions setCount={setVisitorCount} />
        </div>
      </div>
    </main>
  );
}
