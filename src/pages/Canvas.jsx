import React, { useEffect } from "react";
import Whiteboard from "../components/Whiteboard";
import Sidebar from "../components/Sidebar";
import useDeviceType from "../hooks/useDeviceType";
import useWindowDimensions from "../hooks/useWindowDimensions";
import CanvasHeader from "../components/CanvasHeader";

function Canvas() {
  const isMobile = useDeviceType();
  const { width, height } = useWindowDimensions();

  useEffect(() => {
    document.body.style.overflowY = "hidden";
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    return () => {
      document.body.style.overflowY = "auto";
    };
  }, []);

  return (
    <div className={`md:flex h-screen`}>
      {/* Canvas Header */}
      <div className="block md:hidden">
        <CanvasHeader />
      </div>
      {/* Sidebar */}
      <div className="w-60 hidden md:block shadow-md shadow-red-400">
        <Sidebar />
      </div>

      {/* Whiteboard */}
      <div className="flex-1 ">
        <Whiteboard />
      </div>
    </div>
  );
}

export default Canvas;
