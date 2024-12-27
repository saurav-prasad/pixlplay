import { Home, LogOut, UserRound } from "lucide-react";
import React from "react";

function AuthHeader() {
  return (
    <div className="flex justify-between items-center px-2 py-2 bg-white w-full overflow-hidden transition-all text-gray-800 shadow-md mb-3 fixed top-0 z-10">
      <div className="cursor-pointer hover:text-gray-900 hover:bg-gray-200 p-2 rounded-md select-none flex items-center">
        <Home className="h-5 w-5 mr-2" aria-hidden="true" />
        <span className="text-md font-medium truncate">Home</span>
      </div>

      <div className="flex gap-3 flex-1 justify-end items-start">
        <div className="cursor-pointer hover:text-gray-900 hover:bg-gray-200 p-2 rounded-md select-none flex items-center justify-center">
          <UserRound className="mr-2 h-5 w-5" aria-hidden="true" />
          <span className=" text-md font-medium">Profile</span>
        </div>
        <div className="cursor-pointer hover:text-gray-900 hover:bg-gray-200 p-2 rounded-md select-none flex items-center justify-center">
          <LogOut className="h-5 mr-2 w-5" aria-hidden="true" />
          <span className="text-md font-medium truncate">Sign-out</span>
        </div>
      </div>
    </div>
  );
}

export default AuthHeader;
