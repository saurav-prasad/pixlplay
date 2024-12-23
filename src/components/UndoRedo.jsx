import React from "react";
import { Undo, Redo } from "lucide-react";

function UndoRedo({ onUndo, onRedo }) {
  return (
    <>
      <div className="absolute bottom-24 right-4 select-none flex flex-col space-y-4">
        <div
          onClick={onUndo}
          className="bg-gray-300 rounded-full p-2 cursor-pointer"
        >
          <Undo />
        </div>
        <div
          onClick={onRedo}
          className="bg-gray-300 rounded-full p-2 cursor-pointer"
        >
          <Redo />
        </div>
      </div>
    </>
  );
}

export default UndoRedo;
