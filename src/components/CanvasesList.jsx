import React, { memo } from "react";
import Item from "./Item";
import { BadgePlusIcon } from "lucide-react";

function CanvasesList() {
  return (
    <>
      <div className="select-none cursor-pointer flex transform items-center rounded-lg px-3 py-3 transition-colors duration-300 text-gray-900 bg-[#9e99bf85] hover:text-gray-950 justify-start space-x-2 text-lg shadow-[#3c3d591f] shadow-lg border-[#ffffff45] hover:bg-[#6872a6af] backdrop-blur-[100px] border-2 group">
        <BadgePlusIcon
          className="transform group-hover:rotate-[360deg] group-hover:scale-125 duration-1000"
          aria-hidden="true"
        />
        <p className="text-md font-medium w-full truncate">New Canvas</p>
      </div>
      {Array.from({ length: 10 }).map((_, index) => (
        <Item key={index} name={`Canvas${index}`} />
      ))}
    </>
  );
}

export default memo(CanvasesList);
