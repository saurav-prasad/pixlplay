import React, { useState } from "react";
import {
  Plus,
  LogOut,
  User,
  UserRound,
  BadgePlus,
  Pencil,
  Trash2,
  Minimize2,
  CircleCheckBig,
  X,
} from "lucide-react";

function Sidebar({ toggle }) {
  const [onEdit, setOnEdit] = useState(null);
  const [editValue, setEditValue] = useState();

  const handleEditStart = (id, value) => {
    setOnEdit(id);
    setEditValue(`Canvas ${value + 1}`);
  };

  const handleEditEnd = () => {
    setOnEdit(null);
  };
  return (
    <>
      <aside className=" shadow-xl z-10 fixed sm:h-screen h-full w-[90%] md:w-64 border-r ">
        <div className="flex flex-col h-full justify-between text-gray-800 bg-white">
          {/* New Canvas */}
          <div className="px-6 py-5 flex md:block justify-between items-center">
            <div className="-mx-3">
              <span className="select-none cursor-pointer flex transform items-center rounded-lg px-3 py-2 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-900">
                <BadgePlus className="h-6 w-6" aria-hidden="true" />
                <span className="mx-4 text-md font-medium">New Canvas</span>
              </span>
            </div>
            <div
              className="md:hidden block cursor-pointer hover:bg-gray-200 p-2 rounded-md transition-all"
              onClick={toggle}
            >
              <Minimize2 />
            </div>
          </div>

          {/* All Canvases */}
          <div className="flex-1 overflow-y-auto px-6 hideScrollbar space-y-2">
            {Array.from({ length: 20 }).map((_, index) => (
              <div
                key={index}
                className="select-none cursor-pointer flex transform items-center rounded-lg px-3 py-2  transition-colors duration-300 hover:bg-gray-200 bg-gray-50 hover:text-gray-900 justify-between space-x-2"
              >
                {onEdit === index ? (
                  <input
                    type="text"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    className="w-full text-md font-medium px-1 outline-none"
                  />
                ) : (
                  <p className="text-md font-medium w-full truncate">
                    Canvas {index + 1}
                  </p>
                )}
                <div className="flex space-x-4">
                  {onEdit === index ? (
                    <CircleCheckBig
                      onClick={handleEditEnd}
                      className="h-5 w-5 transform hover:rotate-90 hover:scale-125 duration-700"
                      aria-hidden="true"
                    />
                  ) : (
                    <Pencil
                      onClick={() =>
                        setTimeout(() => {
                          handleEditStart(index, index);
                        }, 300)
                      }
                      className="h-5 w-5 transform hover:rotate-90 hover:scale-125 duration-300"
                      aria-hidden="true"
                    />
                  )}
                  {onEdit === index ? (
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
              <span className="-mx-3 mb-4 select-none cursor-pointer flex transform items-center rounded-lg px-3 py-2  transition-colors duration-300 hover:bg-gray-100 hover:text-gray-900">
                <UserRound className="h-6 w-6" aria-hidden="true" />
                <span className="mx-4 text-md font-medium">Profile</span>
              </span>
              <span className="-mx-3 mb-4 select-none cursor-pointer flex transform items-center rounded-lg px-3 py-2  transition-colors duration-300 hover:bg-gray-100 hover:text-gray-900">
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
