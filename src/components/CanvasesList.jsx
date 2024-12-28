import { BadgePlusIcon, Pencil, Trash2 } from "lucide-react";
import React from "react";
import Item from "./Item";

function CanvasesList() {
  return (
    <>
      {/* All Canvases */}
      <div
        className={`flex-1 space-y-2 px-1 pt-24 md:pt-20 pb-2 scroll-smooth max-w-3xl mx-auto `}
      >
        <div className="select-none cursor-pointer flex transform items-center rounded-lg px-3 py-3 transition-colors duration-300 text-gray-900 bg-[#9e99bf85] hover:text-gray-950 justify-start space-x-2 text-lg shadow-[#3c3d591f] shadow-lg border-[#ffffff45] hover:bg-[#6872a6af] backdrop-blur-[100px] border-2">
          <BadgePlusIcon
            className="transform hover:rotate-90 hover:scale-125 duration-300"
            aria-hidden="true"
          />
          <p className="text-md font-medium w-full truncate">New Canvas</p>
        </div>
        {Array.from({ length: 10 }).map((_, index) => (
          // <div
          //   key={index}
          //   className="cursor-pointer flex transform items-center rounded-md px-3 py-4  transition-colors duration-300 hover:bg-gray-200 bg-gray-50 hover:text-gray-900 justify-between space-x-2 text-gray-800"
          // >
          //   <p className="text-lg font-medium w-full truncate">Canvas {index + 1}</p>
          //   <div className="flex space-x-5 text-gray-800">
          //     <Pencil
          //       className="h-6 w-6 transform hover:rotate-90 hover:scale-125 duration-700"
          //       aria-hidden="true"
          //     />
          //     <Trash2
          //       className="h-6 w-6 transform hover:scale-150 duration-700"
          //       aria-hidden="true"
          //     />
          //   </div>
          // </div>
          <Item name={`Canvas ${index + 1}`} key={index} />
        ))}
      </div>
    </>
  );
}

export default CanvasesList;
