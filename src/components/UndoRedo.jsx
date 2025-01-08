import React from "react";
import { Undo, Redo, CloudUpload } from "lucide-react";

function UndoRedo({ onUndo, onRedo, redoArr, linesArr, onSaveChanges }) {
  return (
    <>
      <div className="absolute bottom-24 right-4 select-none flex flex-col space-y-4">
        <div
          onClick={onSaveChanges}
          className={`transition rounded-full p-2 cursor-pointer            
            bg-gray-50 hover:bg-gray-300 text-black hover:ring-2 hover:ring-gray-900 shadow-xl ring-1 ring-gray-300
          md:hidden`}
        >
          <CloudUpload className="w-7 h-7" />
        </div>
        <div
          onClick={onUndo}
          className={`transition rounded-full p-2 cursor-pointer ${
            linesArr.length === 0
              ? "bg-black text-white ring-2 ring-gray-600 shadow-md"
              : "bg-gray-50 hover:bg-gray-300 text-black hover:ring-2 hover:ring-gray-900 shadow-xl ring-1 ring-gray-300"
          }`}
        >
          <Undo className="w-7 h-7" />
        </div>
        <div
          onClick={onRedo}
          className={`transition rounded-full p-2 cursor-pointer ${
            redoArr.length === 0
              ? "bg-black text-white ring-2 ring-gray-600 shadow-md"
              : "bg-gray-50 hover:bg-gray-300 text-black hover:ring-2 hover:ring-gray-900 shadow-xl ring-1 ring-gray-300"
          }`}
        >
          <Redo className="w-7 h-7" />
        </div>
      </div>
    </>
  );
}

export default UndoRedo;
