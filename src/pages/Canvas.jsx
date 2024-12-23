import React from "react";
import Whiteboard from "../components/Whiteboard";
import Sidebar from "../components/Sidebar";
import useDeviceType from "../hooks/useDeviceType";

function Canvas() {
  const isMobile = useDeviceType();
  return (
    <div className={`${!isMobile && "flex"} h-screen`}>
      {/* Sidebar */}
      {!isMobile && (
        <div className="w-60">
          <Sidebar />
        </div>
      )}
      {/* Whiteboard */}
      <div className="flex-1 bg-gray-100">
        <Whiteboard />
      </div>
    </div>
  );
}

export default Canvas;
