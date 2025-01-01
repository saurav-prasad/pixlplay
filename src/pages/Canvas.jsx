import React, { useEffect, useState } from "react";
import Whiteboard from "../components/Whiteboard";
import Sidebar from "../components/Sidebar";
import useDeviceType from "../hooks/useDeviceType";
import useWindowDimensions from "../hooks/useWindowDimensions";
import CanvasHeader from "../components/CanvasHeader";

function Canvas() {
   const backgroundConstants = ["#ff000000", "#e5e7eb", "#ffffff", "#222222","#cfecf7"];
  const [background, setBackground] = useState({
    color: "#ff000000",
    index: 0,
  });
  const isMobile = useDeviceType();
  const { width, height } = useWindowDimensions();

  const toggleBackground = () => {
    if (background.index < backgroundConstants.length - 1) {
      setBackground((prev) => {
        return {
          color: backgroundConstants[prev.index + 1],
          index: prev.index + 1,
        };
      });
    } else {
      setBackground({
        color: "#ff000000",
        index: 0,
      });
    }
  };
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
      <div style={{backgroundColor:background.color}} className={`flex-1`}>
        <Whiteboard toggleBackground={toggleBackground} />
      </div>
    </div>
  );
}

export default Canvas;
