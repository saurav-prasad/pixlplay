import { Logs, Pencil, Share2, Trash2 } from "lucide-react";
import React from "react";

function CanvasHeader() {
  return (
    <div className="flex justify-between items-center px-2 py-1 bg-white shadow-md w-full overflow-hidden">
      <div className="flex items-center space-x-4 flex-1 overflow-hidden">
        <div className="cursor-pointer hover:bg-gray-200 p-2 rounded-md transition-all">
          <Logs className="cursor-pointer" />
        </div>
        <span className="text-xl flex-1 font-bold truncate">
          Canvas1
        </span>
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
  );
}

export default CanvasHeader;
