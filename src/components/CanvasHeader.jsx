import { Logs, Pencil, Share2, Trash2 } from "lucide-react";
import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { Slide } from "react-awesome-reveal";

function CanvasHeader() {
  const [isToggle, setToggle] = useState(true);
  const toggle = () => {
    setToggle(!isToggle);
  };
  return (
    <div className="relative">
      <div className="flex justify-between items-center px-2 py-1 bg-white shadow-md w-full overflow-hidden">
        <div className="flex items-center space-x-4 flex-1 overflow-hidden">
          <div
            onClick={toggle}
            className="cursor-pointer hover:bg-gray-200 p-2 rounded-md transition-all"
          >
            <Logs className="cursor-pointer" />
          </div>
          <span className="text-xl flex-1 font-bold truncate">Canvas1</span>
        </div>
        <div className="flex space-x-4">
          <div className="cursor-pointer hover:bg-gray-200 p-2 rounded-md transition-all">
            <Pencil className="" />
          </div>
          <div className="cursor-pointer hover:bg-gray-200 p-2 rounded-md transition-all">
            <Trash2 className="" />
          </div>
          <div className="cursor-pointer hover:bg-gray-200 p-2 rounded-md transition-all">
            <Share2 className="" />
          </div>
        </div>
      </div>

      <div
        className={`absolute top-0 left-0 w-full transition-transform ${
          isToggle ? "translate-x-0:" : "-translate-x-full w-screen"
        } duration-200 ease-in-out`}
      >
        <Sidebar toggle={toggle} />
      </div>
      {isToggle && (
        <div
          onClick={toggle}
          className="absolute top-0 left-0 z-[5] h-screen w-screen bg-[#5f5f5f91]"
        ></div>
      )}
    </div>
  );
}

export default CanvasHeader;
