"use client";
import {useRouter} from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  
  const router = useRouter();
  const HandleChat = () => {
    const {v4: uuidV4} = require("uuid");
    router.push(`/Rooms/${uuidV4()}`, {t: {name: "test"}});
  };

  return (
    <div className="flex items-center justify-center h-fit mt-16">
      <section className="flex flex-col justify-center max-w-md mr-8">
        <h3 className="orange_gradient text-5xl font-bold sm:text-5xl">
          TINY - ZOOM
        </h3>
        <p className="desc glassmorphism">
          <span className="blue_gradient font-bold ">TINY ZOOM </span>
          Experience the next evolution in video communication with our{" "}
          <span className="bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
            {" "}
            Peer to Peer support
          </span>
          ,{" "}
          <span className="bg-gradient-to-r from-indigo-600 via-red-600 to-yellow-600 bg-clip-text text-transparent">
            crystal-clear video and audio quality
          </span>{" "}
          ,{" "}
          <span className="bg-gradient-to-r from-green-500 via-yellow-600 to-pink-500 bg-clip-text text-transparent">
            real-time screen sharing, and interactive chat features
          </span>{" "}
          ,{" "}
          <span className="bg-gradient-to-r from-yellow-600 via-pink-600 to-pink-400 bg-clip-text text-transparent">
            TINY ZOOM brings you closer than ever before
          </span>
          .{" "}
        </p>
      <Link href={'/Rooms'} className="relative inline-flex items-center justify-center mt-4 p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800">
      <button
        >
          <span className="relative px-5 py-2.5 font-bold text-lg">
            Try It Now
          </span>
        </button>
        </Link>
    
      </section>

      <div className="flex-grow">
        <Image src="hero-image.svg" height={400} width={400} alt="test" />
      </div>
    </div>
  );
}
