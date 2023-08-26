"use client";
import React, {useState, useEffect} from "react";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  const [toggleDropdown, settoggleDropdown] = useState(false);

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
    <nav className="flex-between w-full border-b-2 p-2 ">
      {/* desktop */}
      <div className="sm:flex hidden justify-between w-full">
        <div className="flex">
          <ul className="flex items-end space-x-2">
            <li className="p-2 cursor-pointer ">
              <button
                type="button"
                class="border border-gray-800 bg-white dark:hover:bg-black focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-gray-600 dark:focus:ring-gray-800"
              >
                <Link href="/" className="purple_gradient flex">
                  <div>Home</div>
                  <Image
                    src="/hime.png"
                    alt="Home"
                    width={30}
                    height={30}
                    className="ml-2"
                  />
                </Link>
              </button>
            </li>
            <li className="p-2 cursor-pointer ">
              <button
                type="button"
                class="border border-gray-800 bg-white dark:hover:bg-black focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-gray-600 dark:focus:ring-gray-800"
              >
                <Link href="/Rooms" className="purple_gradient flex">
                  <div>Rooms </div>
                  <Image
                    src="/msgs.png"
                    alt="Use Client Icon"
                    width={30}
                    height={30}
                    className="ml-2"
                  />
                </Link>
              </button>
            </li>
          </ul>
        </div>
        {loading ? null : !user ? (
          <ul className="flex-between  items-end  space-x-2">
            <li onClick={handleSignIn} className="p-2 cursor-pointer black_btn">
              <div>Login</div>
              <Image
                src="/lofin.png"
                alt="Use Client Icon"
                width={30}
                height={30}
                className="ml-2"
              />
            </li>
            <li
              onClick={handleSignIn}
              className="p-2 cursor-pointer black_btn ml-3 "
            >
              <div>Sign Up</div>
              <Image
                src="/Signup.png"
                alt="Signup"
                width={30}
                height={30}
                className="ml-2"
              />
            </li>
          </ul>
        ) : (
          <div></div>
        )}
      </div>
      {/* Phone */}

      <div className="sm:hidden flex relative">
        <div className="flex flex-row items-end space-y-1">
          <Link href="/" className="purple_gradient flex-between"  onClick={() => settoggleDropdown((prev) => !prev)}>
            <div className="">Home</div>
            <Image
              src="/hime.png"
              alt="Home"
              width={40}
              height={40}
              className="ml-2"
            />
          </Link>

          <Link href="/Rooms" className="purple_gradient flex-between">
            <div className="">Rooms</div>
            <Image
              src="/hime.png"
              alt="Home"
              width={40}
              height={40}
              className="ml-2"
            />
          </Link>
          <div className="ml-10"> 
            {" "}
            <Image
              src="/lofin.png"
              width={37}
              height={37}
              className="rounded-full"
              alt="profile"
              onClick={() => settoggleDropdown((prev) => !prev)}
            />
            {toggleDropdown && ( <div className="dropdown bg-slate-400">
              <Link
                href="/"
                className="drowpdown_link purple_gradient font-bold border-solid border-2 rounded-lg border-spacing-5 border-red-100"
                onClick={() => settoggleDropdown(false)}
              >
                My Profile
              </Link>

              <Link
                href="/"
                className="drowpdown_link purple_gradient font-bold"
                onClick={() => settoggleDropdown(false)}
              >
                New Room
              </Link>

              <button
                type="button"
                className="mt-5 w-full black_btn purple_gradient "
                onClick={() => {
                  settoggleDropdown(false);
                  signOut();
                }}
              >
                Sign Out
              </button>
            </div>)}
           
          </div>
        </div>
        <div></div>
      </div>
    </nav>
  );
};

export default Navbar;
