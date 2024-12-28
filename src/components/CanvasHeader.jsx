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
    setEditValue("Canvas1");
  };

  const handleEditEnd = () => {
    setOnEdit(false);
  };

  // Focus the input when editing starts
  useEffect(() => {
    if (onEdit) {
      inputRef.current.focus();
    }
  }, [onEdit]);
  const handleOnChange = (e) => {
    setEditValue(e.target.value);
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
          {onEdit ? (
            <input
              ref={inputRef}
              type="text"
              value={editValue}
              onChange={handleOnChange}
              className="w-full text-xl font-bold outline-none"
            />
          ) : (
            <span className="text-xl flex-1 font-bold truncate">Canvas1</span>
          )}
        </div>
        {/* icons */}
        <div className="flex space-x-4">
          {/* edit - save */}
          <div
            className="cursor-pointer hover:bg-gray-200 p-2 rounded-md transition-all"
            title={onEdit ? "Save Changes" : "Edit name"}
          >
            {onEdit ? (
              <CircleCheckBig onClick={handleEditEnd} aria-hidden="true" />
            ) : (
              <Pencil onClick={handleEditStart} aria-hidden="true" />
            )}
          </div>
          {/* cancel - delete */}
          <div
            // onClick={onEdit ? handleEditEnd() : null}
            className="cursor-pointer hover:bg-gray-200 p-2 rounded-md transition-all"
            title={onEdit ? "Cancel" : "Delete"}
          >
            {onEdit ? (
              <X onClick={handleEditEnd} aria-hidden="true" />
            ) : (
              <Trash2
                aria-hidden="true"
                className="transition-all hover:scale-125 duration-200"
              />
            )}
          </div>
          {/* share */}
          <div className="cursor-pointer hover:bg-gray-200 p-2 rounded-md transition-all">
            <Share2 className="" />
          </div>
        </div>
      </div>
      {/* sidebar */}
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
