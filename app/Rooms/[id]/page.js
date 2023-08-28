"use client";

import {useRouter} from "next/navigation";
import {usePathname} from "next/navigation";
import {useEffect, useState} from "react";
import VideoTest from "@/components/VideoTest";
import VideoImplemnt from "@/components/XXX";
import {UserAuth} from "@/context/AuthContext";
import {db} from "@/firebase";

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

const getRooms = async (RoomId) => {
  console.log("TEST");
  const UserRef = doc(db, "MZChats", RoomId);
  const docSnap = await getDoc(UserRef);
  let options = false;
  if (docSnap.exists()) {
    if (docSnap.data().accessibility === "Users") {
      options = {exist: true, access: "Users"};
      return options;
    }
    if (docSnap.data().accessibility === "Open") {
      options = {exist: true, access: "Open"};
      return options;
    }
  }
  return options;
};


const Room = () => {
  const {user} = UserAuth();

  const pathname = usePathname().replace("/Rooms/", "");

  const [roomId, setRoomId] = useState(false);

  useEffect(() => {
    getRooms(pathname).then((stauts) => {
      setRoomId(stauts);
      console.log(stauts.access)
    });

    console.log(roomId);
  }, []);

  return (
    <div className="flex-between gap-3">
      {roomId && roomId.exist ? (
        roomId.access === 'Users' && user ? (
          <VideoTest roomId={pathname} />
        ) : roomId.access === 'Users' && !user  ? (
          <>Please Sign In To Access The Room</>
        ) : roomId.access === 'Open' ?(
          <VideoTest roomId={pathname} />
        ): (
          <>Please Sign In To Access The Room</>
        )
      ) : (
        <>Room Does not Exist</>
      )}
    </div>
  );
};

export default Room;

{
  /* <VideoChat roomId={123} userId={userId} /> */
}
