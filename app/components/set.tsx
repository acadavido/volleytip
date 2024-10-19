import { SetDto } from "~/dtos/dtos";

// eslint-disable-next-line react/prop-types
export function Set({ local, visitor }: SetDto) {
  return (
    <>
      <div
        className="w-10 h-12 m-2 border-2 border-blue-volleytip rounded-md flex justify-center items-center"
        style={{ color: "white" }}
      >
        {visitor}
      </div>
      <div
        className="w-10 h-12 m-2 border-2 border-blue-volleytip rounded-md flex justify-center items-center"
        style={{ color: "white" }}
      >
        {local}
      </div>
    </>
  );
}
