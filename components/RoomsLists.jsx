import Image from "next/image";
import Link from "next/link";
import {db} from "@/firebase";
import {UserAuth} from "../context/AuthContext";
import { ToastContainer, toast } from 'react-toastify';


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
import {useEffect, useState} from "react";

async function GetUserRooms(User) {
  const UserRef = doc(db, "MZUsers", User.uid);
  const docSnap = await getDoc(UserRef);

  const userRooms = docSnap.data().Rooms;
  console.log("FIRESTORE READ ALERTx2")
  return userRooms;
}

async function getRoomsInfo(RoomId) {

  const UserRef = doc(db, "MZChats", RoomId);
  console.log("FIRESTORE READ ALERTx1")

  const docSnap = await getDoc(UserRef)
  //console.log(docSnap.data())
  const ChatInfo = {
    RoomId: docSnap.data().Title,
    //Accessibility: docSnap.data().accessibility,
    RoomOwner: docSnap.data().RoomOwnerName,
    PassCode: docSnap.data().passcode,
  };

  return ChatInfo;
}




const Room1 = ({RoomId}) => {

  const showToastMessage = () => {
    toast('🦄 Wow so easy!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
};




  const [roomInfo, setRoomInfo] = useState(null); // State to store room information

  useEffect(() => {
    // Call the async function when the component mounts
    getRoomsInfo(RoomId)
      .then(info => {
        setRoomInfo(info); // Update the state with retrieved room information
      })
      .catch(error => {
        console.error('Error retrieving room information:', error);
      });
  }, [RoomId]); // Run this effect whenever RoomId changes

  if (!roomInfo) {
    return <div>Loading...</div>; // You can display a loading indicator while data is being fetched
  }

  return (
    <div className=" flex border-grey-300 border-2 w-50 mt-5 black_btn">
      <div className="flex">
        <Link href={`/Rooms/${RoomId}`} value="Test" className="btn_edit mr-3">
          {" "}
          <Image src="/logo.png" height={30} width={30} />
          <span className="font-bold mr-2 purple_gradient"> Share </span>
        </Link>
      </div>
      <div className="flex-col font-bold">
        <h3>
          Room Id: <span className="font-bold blue_gradient">{roomInfo.RoomId}</span>
        </h3>
        <h3>
          Room Owner: <span className="font-bold orange_gradient">{roomInfo.RoomOwner}</span>
        </h3>
      </div>

      <Link href={`/Rooms/${RoomId}`} className="btn_edit ml-3">
        {" "}
        <span className="font-bold mr-2 purple_gradient"> Join </span>{" "}
        <Image src="/call.png" height={30} width={30} />
      </Link>
            
    </div>
  );
};

const RoomsLists = () => {
  const {user, googleSignIn, logOut} = UserAuth();
  const [userRooms, setUserRooms] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 50));
      const rooms = await GetUserRooms(user);
      setUserRooms(rooms);
      setLoading(false);
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    
    <div>
      {userRooms.map((room) => (
        <Room1 key={room.id} RoomId={room} />
      ))}
    </div>
  );
};
export default RoomsLists;
