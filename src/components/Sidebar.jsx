import React from "react";
import {
  Plus,
  LogOut,
  User,
  UserRound,
  BadgePlus,
  Pencil,
  Trash2,
} from "lucide-react";

function Sidebar() {
  return (
    <>
      <aside
        className="z-10 fixed sm:h-screen h-[94vh] w-60 border-r bg-white"
      >
        <div className="flex flex-col h-full justify-between">
          {/* New Canvas */}
          <div className="px-6 py-5">
            <div className="-mx-3 mb-2">
              <span className="select-none cursor-pointer flex transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700">
                <BadgePlus className="h-6 w-6" aria-hidden="true" />
                <span className="mx-4 text-md font-medium">New Canvas</span>
              </span>
            </div>
          </div>

          {/* All Canvases */}
          <div className="flex-1 overflow-y-auto px-6 hideScrollbar">
            {Array.from({ length: 20 }).map((_, index) => (
              <div
                key={index}
                className="select-none cursor-pointer flex transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-200 bg-gray-50 hover:text-gray-700 justify-between space-x-2 mb-2"
              >
                <p className="text-md font-medium w-full">Canvas {index + 1}</p>
                <div className="flex space-x-4">
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

          {/* Profile and Sign-out */}
          <div className="px-6 py-5">
            <div className="space-y-4">
              <span className="-mx-3 mb-4 select-none cursor-pointer flex transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700">
                <UserRound className="h-6 w-6" aria-hidden="true" />
                <span className="mx-4 text-md font-medium">Profile</span>
              </span>
              <span className="-mx-3 mb-4 select-none cursor-pointer flex transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700">
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
