import { Pencil, Trash2 } from "lucide-react";
import React from "react";

function CanvasesList() {
  return (
    <>
      {/* All Canvases */}
      <div className="flex-1 overflow-y-auto space-y-3 px-1 mt-16 pb-2 scroll-smooth">
        {Array.from({ length: 20 }).map((_, index) => (
          <div
            key={index}
            className="cursor-pointer flex transform items-center rounded-md px-3 py-4  transition-colors duration-300 hover:bg-gray-200 bg-gray-50 hover:text-gray-900 justify-between space-x-2"
          >
            <p className="text-md font-medium w-full">Canvas {index + 1}</p>
            <div className="flex space-x-5">
              <Pencil
                className="h-5 w-5 transform hover:rotate-90 hover:scale-125 duration-700"
                aria-hidden="true"
              />
              <Trash2
                className="h-5 w-5 transform hover:scale-150 duration-700"
                aria-hidden="true"
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default CanvasesList;
