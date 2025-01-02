import React, { useEffect, useRef, useState } from "react";
import {
  LogOut,
  UserRound,
  BadgePlus,
  Pencil,
  Trash2,
  Minimize2,
  CircleCheckBig,
  X,
  House,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function Sidebar({ toggle }) {
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState("");
  const navigate = useNavigate();
  const inputRef = useRef([]);

  const handleEditStart = (id, value) => {
    setEditIndex(id);
    setEditValue(`Canvas ${value + 1}`);
  };

  const handleEditEnd = () => {
    setEditIndex(null);
  };

  const handleOnChange = (e) => {
    setEditValue(e.target.value);
  };

  // Focus the input when editing starts
  useEffect(() => {
    if (editIndex !== null && inputRef.current[editIndex]) {
      inputRef.current[editIndex].focus();
    }
  }, [editIndex]);

  return (
    <>
      <aside className="shadow-xl z-10 fixed sm:h-screen h-full w-[90%] md:w-64 border-r">
        <div className="flex flex-col h-full justify-between text-gray-800 bg-white">
          {/* New Canvas */}
          <div className="px-6 pt-5 pb-4 flex md:block justify-between items-center">
            <div
              className="-mx-3 w-[85%] md:w-auto"
              onClick={() => navigate("/")}
            >
              <span className="select-none cursor-pointer flex transform items-center rounded-lg px-3 py-2 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-900">
                <House className="h-6 w-6" aria-hidden="true" />
                <span className="mx-4 text-md font-medium">Home</span>
              </span>
            </div>
            <div
              className="md:hidden cursor-pointer hover:bg-gray-200 p-2 rounded-md transition-all"
              onClick={toggle}
            >
              <Minimize2 />
            </div>
          </div>
          {/* New Canvas */}
          <div className="px-6 pb-5 flex md:block justify-between items-center">
            <div className="-mx-3 w-full">
              <span className="select-none cursor-pointer flex transform items-center rounded-lg px-3 py-2 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-900 group">
                <BadgePlus
                  className="h-6 w-6 transform group-hover:rotate-[360deg] group-hover:scale-125 duration-1000"
                  aria-hidden="true"
                />
                <span className="mx-4 text-md font-medium">New Canvas</span>
              </span>
            </div>
          </div>

          {/* All Canvases */}
          <div className="flex-1 overflow-y-auto px-6 hideScrollbar space-y-2">
            {Array.from({ length: 30 }).map((_, index) => (
              <div
                key={index} // Use a stable key
                className="select-none cursor-pointer flex transform items-center rounded-lg px-3 py-2 transition-colors duration-300 hover:bg-gray-200 bg-gray-50 hover:text-gray-900 justify-between space-x-2"
              >
                {editIndex === index ? (
                  <input
                    ref={(el) => (inputRef.current[index] = el)}
                    type="text"
                    value={editValue}
                    onChange={handleOnChange}
                    className="w-full text-md font-medium pr-1 outline-none"
                  />
                ) : (
                  <p className="text-md font-medium w-full truncate">
                    Canvas {index + 1}
                  </p>
                )}
                <div className="flex space-x-4">
                  {editIndex === index ? (
                    <CircleCheckBig
                      onClick={handleEditEnd}
                      className="h-5 w-5 transform hover:rotate-90 hover:scale-125 duration-700"
                      aria-hidden="true"
                    />
                  ) : (
                    <Pencil
                      onClick={() => handleEditStart(index, index)}
                      className="h-5 w-5 transform hover:rotate-90 hover:scale-125 duration-300"
                      aria-hidden="true"
                    />
                  )}
                  {editIndex === index ? (
                    <X
                      onClick={handleEditEnd}
                      className="h-5 w-5 transform hover:scale-150 duration-700"
                      aria-hidden="true"
                    />
                  ) : (
                    <Trash2
                      className="h-5 w-5 transform hover:scale-150 duration-700"
                      aria-hidden="true"
                    />
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Profile and Sign-out */}
          <div className="px-6 py-5">
            <div className="space-y-4">
              <span
                onClick={() => navigate("/profile")}
                className="-mx-3 mb-4 select-none cursor-pointer flex transform items-center rounded-lg px-3 py-2 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-900"
              >
                <UserRound className="h-6 w-6" aria-hidden="true" />
                <span className="mx-4 text-md font-medium">Profile</span>
              </span>
              <span
                onClick={() => navigate("/signin")}
                className="-mx-3 mb-4 select-none cursor-pointer flex transform items-center rounded-lg px-3 py-2 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-900"
              >
                <LogOut className="h-6 w-6" aria-hidden="true" />
                <span className="mx-4 text-md font-medium">Sign-out</span>
              </span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
