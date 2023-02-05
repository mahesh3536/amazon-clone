import Image from "next/image";
import React from "react";
import {
    Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import {signIn,signOut,useSession} from "next-auth/react"
import { useRouter } from "next/dist/client/router";
import { useSelector } from "react-redux";
import { selectItems } from "../slices/basketSlice";
function Header() {
  const { data: session, status }  = useSession(); 
  const router = useRouter();
  const items = useSelector(selectItems);
  return (
    <header className="sticky top-0 z-50">
      <div className="flex items-center bg-amazon_blue p-1 py-2 flex-grow">
        <div className="flex flex-grow items-center mt-2 sm:flex-grow-0 mr-2">
          <Image
            onClick={() => router.push("/")}
            src="https://links.papareact.com/f90"
            alt="amazon"
            width={150}
            height={40}
            className="object-contain w-auto  cursor-pointer"
          />
        </div>
        {/* {searchbar} */}
        <div className=" hidden sm:flex items-center h-10 rounded-md flex-grow cursor-pointer  bg-yellow-400 hover:bg-yellow-500">
          <input
            type="text"
            className="h-full p-2 flex-grow w-6 rounded-md flex-shrink focus:outline-none"
          />
          <MagnifyingGlassIcon className="h-12 p-4" />
        </div>
        {/* right */}
        <div className="text-white flex items-center text-xs space-x-6 mx-6 whitespace-nowrap">
          <div className=" link " onClick={!session ?signIn as any : signOut as any}>
            <p>
              {session ? `Hello ${session.user?.name}` : "Sign In"}
            </p>
            <p className="font-extrabold md:text-sm">Account & list</p>
          </div>
          <div className=" link ">
            <p>Returns</p>
            <p className="font-extrabold md:text-sm">& Orders</p>
          </div>
          <div className="relative link flex items-center" onClick={()=> router.push("/checkout")}>
            <span className="absolute top-0 right-0 md:right-10 bg-yellow-400 text-center h-4 w-4 rounded-full text-black font-bold">
              {items.length}
            </span>
            <ShoppingCartIcon className="h-10 " />
            <p className="hidden md:inline font-extrabold md:text-sm mt-2">
              Basket
            </p>
          </div>
        </div>
      </div>

      {/* Bottom view */}
      <div className="flex items-center space-x-3 p-2 pl-6 bg-amazon_blue-light text-white text-sm">
        <p className="link flex items-center ">
        <Bars3Icon className="h-6 mr-1"/>
        All
        </p>
        <p className="link">
            Prime video
        </p>
        <p className="link">Amazon Business</p>
        <p className="link">Today's deals</p>
        <p className="link hidden lg:inline">Electronics</p>
        <p className="link hidden lg:inline">Food & grocery</p>
        <p className="link hidden lg:inline">Prime</p>
        <p className="link hidden lg:inline">Buy again</p>
        <p className="link hidden lg:inline">Shopper toolkit</p>
        <p className="link hidden lg:inline">Health & personal care</p>
      </div>


    </header>
  );
}

export default Header;
