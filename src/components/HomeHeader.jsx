import { BadgePlus, LogOut, UserRound } from "lucide-react";
import React from "react";
import {
  useLocation,
  useNavigate,
  useParams,
  useRoutes,
} from "react-router-dom";

function HomeHeader() {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <div className="flex justify-between items-center sm:px-9 px-2 py-2 bg-transparent backdrop-blur-lg w-full transition-all text-gray-900 text-lg sm:font-semibold font-medium shadow-[#e3b0b3] shadow-md mb-3 fixed top-0 z-10">
      <div className="transition cursor-pointer hover:bg-[#d995952b] hover:shadow-lg p-2 rounded-lg select-none flex items-center">
        {}
        <h1
          className="text-center font-whisper font-bold text-[2.1rem] text-indigo-700
            "
        >
          Pixl Play
        </h1>
      </div>

      <div className="flex sm:gap-5 gap-2 flex-1 justify-end items-start">
        <div className="transition cursor-pointer hover:bg-[#d995952b] hover:shadow-lg p-2 rounded-lg select-none flex items-center">
          <BadgePlus className="mr-2 h-5 w-5" aria-hidden="true" />
          <span className="truncate">New Canvas</span>
        </div>
        <div className="transition cursor-pointer hover:bg-[#d995952b] hover:shadow-lg p-2 rounded-lg select-none flex items-center">
          <UserRound className="mr-2 h-5 w-5" aria-hidden="true" />
          <span className="truncate">Profile</span>
        </div>
        <div className="transition cursor-pointer hover:bg-[#d995952b] hover:shadow-lg p-2 rounded-lg select-none flex items-center">
          <LogOut className="h-5 mr-2 w-5" aria-hidden="true" />
          <span className="truncate">Sign-out</span>
        </div>
      </div>
    </div>
  );
}

export default HomeHeader;
