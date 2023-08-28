"use client";

import {useRouter} from "next/navigation";
import {usePathname} from "next/navigation";
import Popup from "@/components/Popup";
import {useEffect, useState} from "react";
import RoomsLists from "@/components/RoomsLists";
import {UserAuth} from "@/context/AuthContext";
import Link from "next/link";

import {
  collection,
  getDocs,
  addDoc,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  serverTimestamp,
  deleteDoc,
  deleteField,
  query,
  where,
  FieldValue,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";

import {db} from "@/firebase";




//MOVE TO ROOMLISTS
async function GetUserRooms(User) {
  console.log(User);
  const UserRef = doc(db, "MZUsers", User.uid);
  const docSnap = await getDoc(UserRef);
  return docSnap.data().Rooms;
}


//FOR CREATING NEW ROOMS
async function AddUserRooms(User, newRoomNumber) {
  console.log(User);
  const UserRef = doc(db, "MZUsers", User.uid);
  await updateDoc(UserRef, {Rooms: arrayUnion(String(newRoomNumber))});

}




const Room = () => {
  const router = useRouter();
  async function CreateNewRoom(User){
    const {v4: uuidV4} = require("uuid");
    const newRoomNumber = uuidV4();
    const NewRoom = {
      Title:newRoomNumber,
      roomId: newRoomNumber,
      roomCreationDate: serverTimestamp(),
      roomOwnerId: User.uid,
      roomMembers: [User.uid],
      accessibility: accessibility,
      passcode: passCode,
      RoomOwnerName: User.displayName,
      Img: User.photoURL,
    }
    const docRef = doc(db, "MZChats", (newRoomNumber))
    await  setDoc (docRef, (NewRoom))
    AddUserRooms(User, (newRoomNumber));
    SetUserRooms(prevRooms => [...prevRooms, newRoomNumber]);
    router.push(`/Rooms/${newRoomNumber}`);
  
  }



  const {user, googleSignIn, logOut} = UserAuth();
  const [loading, setLoading] = useState(true);

  const [joinRoomPopUp, setjoinRoomPopUp] = useState(false);
  const [newRoomPopUp, setNewRoomPopUp] = useState(false);
  const [joinRoomValue, setJoinRoomValue] = useState("");
  const [accessibility, setAccessibility] = useState("Open");
  const [showInputField, setShowInputField] = useState(false);
  const [passCode, setPassCode] = useState("");

  const [userRooms, SetUserRooms] = useState([]);



  // Wait For Auth To Connect
  useEffect(() => {
    const checkAuthentication = async () => {
      await new Promise((resolve) => setTimeout(resolve, 50));
      setLoading(false);
    };
    checkAuthentication();
  }, [user]);





  // To Handle Room Creation
  
 



  const handleAccessibilityChange = (event) => {
    const selectedValue = event.target.value;
    console.log(selectedValue);
    setAccessibility(selectedValue);

    // Check if the selected value is "Invitation"
    if (selectedValue === "Invitation") {
      setShowInputField(true);
    } else {
      setShowInputField(false);
    }
  };

  // Generate a user ID using any method you prefer

  return (
    <div className="flex-col">
      {loading ? null : !user ? (
        <>Please Sign IN</>
      ) : (
        <div>
          <div className="flex-between gap-3">
            <button
              onClick={() => {
                setNewRoomPopUp(true);
              }}
              className="w-1/2 relative inline-flex items-center justify-center mt-4 p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800"
            >
              <span className="relative px-5 py-2.5 font-bold text-lg ">
                Create a New Room
              </span>
            </button>
            <button
              onClick={() => {
                setjoinRoomPopUp(true);
              }}
              className="w-1/2 relative inline-flex items-center justify-center mt-4 p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800"
            >
              <span className="relative px-5 py-2.5 font-bold text-lg">
                Join a Room
              </span>
            </button>

            <Popup trigger={joinRoomPopUp} setTriger={setjoinRoomPopUp}>
              <h3>Enter Room Number</h3>
              <input
                onChange={e=>setJoinRoomValue(e.target.value)}
                className="form_input border-solid border-2"
              />
              <Link
                className={`black_btn mt-3`}
                href={`/Rooms/${joinRoomValue}`}
              >
                Join
              </Link>
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
                value={accessibility}
                onChange={handleAccessibilityChange}
              >
                <option selected disabled>
                  Choose Accessbility
                </option>
                <option value="Open">Open For All</option>
                <option value="Users">Users Only</option>
                <option value="Invitation">Invitation Only (Under Development)</option>
              </select>

              {showInputField && (
                <div>
                  <input
                    
                    type="text"
                    value={passCode}
                    onChange={e=>{setPassCode(e.target.value)}}
                    placeholder="Enter PassCode for the Room"
                    className="block py-2.5 px-0 w-full mt-2 text-sm text-blue-300 bg-transparent border-b-2 border-gray-200 appearance-none dark:text-gray-900 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                  />
                </div>
              )}

              <button
                className={`black_btn mt-3 justify-center align-middle ml-52`}
                onClick={   
                  ()=>CreateNewRoom(user)
                  
                }
              >
                Create Room
              </button>
            </Popup>
          </div>

          <div>
            <RoomsLists userID={user.uid} className="flex mt-10"></RoomsLists>
          </div>
        </div>
      )}
    </div>
  );
};

export default Room;
