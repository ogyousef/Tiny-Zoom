import Image from "next/image";
import Link from "next/link";

const roomInfo = {
  roomId: "",
  roomCreationDate: "",
  roomMembers: "",
  roomDefaultpic: "",
  roomLink:"",
};

const Room1 = () => {
  return (
    <div className=" flex border-grey-300 border-2 w-50 mt-5 black_btn">
      <div className="flex">

        <Link href={"/"} className="btn_edit mr-3">  <Image src="/logo.png" height={30} width={30} />
            share
        </Link>
    
    
      </div>
      <div className="flex-col font-bold">
        <h3>
          Room Id: <span className="font-bold">Room Id Here</span>
        </h3>
        <h4 className="border-b-2 border-red-200">
          Creation Date: <span className="font-bold ">Room Id Here</span>
        </h4>
        <h3>
          Room Members: <span className="font-bold">Room Id Here</span>
        </h3>
      </div>

      <Link href={"/"} className="btn_edit ml-3"> <span className="font-bold mr-2">Join </span> <Image src="/call.png" height={30} width={30} />
            
        </Link>
    </div>
  );
};

const RoomsLists = () => {
  return (
    <div>
      <Room1 />
    </div>
  );
};
export default RoomsLists;
