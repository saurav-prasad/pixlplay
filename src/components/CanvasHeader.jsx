import { CircleCheckBig, Logs, Pencil, Share2, Trash2, X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import Sidebar from "./Sidebar";
import { Slide } from "react-awesome-reveal";

function CanvasHeader() {
  const [isToggle, setToggle] = useState(false);
  const [onEdit, setOnEdit] = useState(false);
  const [editValue, setEditValue] = useState();
  const inputRef = useRef(null);

  const toggle = () => {
    setToggle(!isToggle);
  };

  const handleEditStart = () => {
    setOnEdit(true);
    setEditValue(`Canvas ${1}`);
  };

  const handleEditEnd = () => {
    setOnEdit(false);
  };

  // Focus the input when editing starts
  useEffect(() => {
    if (onEdit && inputRef.current) {
      inputRef.current.focus();
    }
  }, [onEdit]);

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
          {onEdit ? (
            <input
              ref={inputRef}
              type="text"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              className="w-full text-xl font-bold outline-none"
            />
          ) : (
            <span className="text-xl flex-1 font-bold truncate">Canvas1</span>
          )}
        </div>
        <div className="flex space-x-4">
          <div
            onClick={onEdit ? handleEditEnd : handleEditStart}
            title={onEdit ? "Save Changes" : "Edit name"}
            className="cursor-pointer hover:bg-gray-200 p-2 rounded-md transition-all"
          >
            {onEdit ? (
              <CircleCheckBig className="" aria-hidden="true" />
            ) : (
              <Pencil className="" />
            )}
          </div>
          <div
            onClick={onEdit ? handleEditEnd() : null}
            title={onEdit ? "Cancel" : "Delete Canvas"}
            className="cursor-pointer hover:bg-gray-200 p-2 rounded-md transition-all"
          >
            {onEdit ? <X /> : <Trash2 aria-hidden="true" />}
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
