"use client";
import React, {useState, useEffect} from "react";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  const [loading, setLoading] = useState(true);
  const user = false;
  const handleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const checkAuthentication = async () => {
      await new Promise((resolve) => setTimeout(resolve, 50));
      setLoading(false);
    };
    checkAuthentication();
  }, [user]);
  //navbar bg-primary text-primary-content
  return (
   <nav className="flex-between w-full mb-16 pt-3">
    <Link href="/" className="gap-2 flex-center">
        <Image
          className="objext-contain"
          src="logo.svg"
          width="30"
          height="30"
          alt='test'
        />
        <p className="logo_text">Promptoia</p>
      </Link>

    </nav>
  );
};

export default Navbar;
