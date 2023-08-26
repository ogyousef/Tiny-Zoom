"use client";

import {useRouter} from "next/navigation";
import {usePathname} from "next/navigation";
import Popup from "@/components/Popup";
import {useState} from "react";
import RoomsLists from "@/components/RoomsLists";
const Room = () => {
  const [joinRoomPopUp, setjoinRoomPopUp] = useState(false);
  const [newRoomPopUp, setNewRoomPopUp] = useState(false);
  const [joinRoomValue, setJoinRoomValue] = useState("");

  const pathname = usePathname();

  const handleInputChange = (event) => {
    setjoinRoomValue(event.target.value);
  };

  const isInputEmpty = joinRoomValue.trim() === "";

  // Generate a user ID using any method you prefer
  const userId = "user123";

  return (
    <div className="flex-col">
      <div className="flex gap-3">
      <button
        onClick={() => {
          setNewRoomPopUp(true);
        }}
        className="relative inline-flex items-center justify-center mt-4 p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800"
      >
        <span className="relative px-5 py-2.5 font-bold text-lg ">
          Create a New Room
        </span>
      </button>
      <button
        onClick={() => {
          setjoinRoomPopUp(true);
        }}
        className="relative inline-flex items-center justify-center mt-4 p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800"
      >
        <span className="relative px-5 py-2.5 font-bold text-lg">
          Join a Room
        </span>
      </button>

      <Popup trigger={joinRoomPopUp} setTriger={setjoinRoomPopUp}>
        <h3>Enter Room Number</h3>
        <input
          value={joinRoomValue}
          className="form_input border-solid border-2"
          onChange={(e) => {
            handleInputChange(e);
          }}
        />
        <button
          disabled={isInputEmpty}
          className={`black_btn mt-3`}
          onClick={() => console.log(joinRoomValue)}
        >
          Join
        </button>
      </Popup>

      <Popup trigger={newRoomPopUp} setTriger={setNewRoomPopUp}>

        <h2 className="font-bold blue_gradient">Create a New Room</h2>
        <h2 className="font-bold mt-3 orange_gradient">
           Select The accessbility of the Room
        </h2>

        <label for="underline_select" class="sr-only">
          Underline select
        </label>

        <select

          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-900 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
        >
          <option selected disabled>Choose Accessbility</option>
          <option value="US">Open For All</option>
          <option value="CA">Users Only</option>
          <option value="FR">Invitation Only</option>

        </select>

        <button
          disabled={isInputEmpty}
          className={`black_btn mt-3 justify-center align-middle ml-52`}
          onClick={() => console.log(inputValue)}
        >
          Create Room
        </button>
      </Popup>
      </div>
      <RoomsLists className="flex mt-10">
        
      </RoomsLists>
    </div>
  );
};

export default Room;
