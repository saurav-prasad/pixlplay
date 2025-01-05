import React, { useEffect, useRef, useState } from "react";
import Whiteboard from "../components/Whiteboard";
import Sidebar from "../components/Sidebar";
import useDeviceType from "../hooks/useDeviceType";
import useWindowDimensions from "../hooks/useWindowDimensions";
import CanvasHeader from "../components/CanvasHeader";

function Canvas() {
  const backgroundConstants = [
    "#ff000000",
    "#e5e7eb",
    "#ffffff",
    "#222222",
    "#cfecf7",
  ];
  const [bgIndex, setBgIndex] = useState(0);
  const backgroundRef = useRef(null);
  const isMobile = useDeviceType();
  const { width, height } = useWindowDimensions();

  const toggleBackground = () => {
    if (bgIndex < backgroundConstants.length - 1) {
      backgroundRef.current.style.backgroundColor =
        backgroundConstants[bgIndex + 1];
      setBgIndex((prev) => prev + 1);
    } else {
      backgroundRef.current.style.backgroundColor = backgroundConstants[0];
      setBgIndex(0);
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
    <div ref={backgroundRef} className={`md:flex h-screen transition-all`}>
      {/* Canvas Header */}
      <div className="block md:hidden">
        <CanvasHeader />
      </div>
      {/* Sidebar */}
      {!isMobile && (
        <div className="w-60 hidden md:block shadow-md shadow-red-400">
          <Sidebar />
        </div>
      )}

      {/* Whiteboard */}
      <div className={`flex-1`}>
        <Whiteboard toggleBackground={toggleBackground} />
      </div>
    </div>
  );
}

export default Canvas;
