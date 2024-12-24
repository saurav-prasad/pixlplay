import React from "react";
import { Undo, Redo } from "lucide-react";

function UndoRedo({ onUndo, onRedo, redoArr, linesArr }) {
  return (
    <>
      <div className="absolute bottom-24 right-4 select-none flex flex-col space-y-4">
        <div
          onClick={onUndo}
          className={`transition hover:ring-1 ring-gray-600 bg-gray-300 rounded-full p-2 cursor-pointer hover:bg-gray-400 ${
            linesArr.length === 0 && "bg-gray-400"
          }`}
        >
          <Undo />
        </div>
        <div
          onClick={onRedo}
          className={`transition hover:ring-1 ring-gray-600 bg-gray-300 rounded-full p-2 cursor-pointer hover:bg-gray-400 ${
            redoArr.length === 0 && "bg-gray-400"
          }`}
        >
          <Redo />
        </div>
      </div>
    </>
  );
}

export default UndoRedo;
