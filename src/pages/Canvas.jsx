import React, { lazy, Suspense, useEffect, useRef, useState } from "react";
import "../components/Whiteboard";
import useDeviceType from "../hooks/useDeviceType";
import useWindowDimensions from "../hooks/useWindowDimensions";
import CanvasHeader from "../components/CanvasHeader";
import Loader from "../components/Loader";
import getStoredCanvasBg from "../utils/getStoredCanvasBg"

// lazy loaders
const Whiteboard = lazy(() => import("../components/Whiteboard"));
const Sidebar = lazy(() => import("../components/Sidebar"));

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
      localStorage.setItem(
        "background-color",
        backgroundConstants[bgIndex + 1]
      );
      setBgIndex((prev) => prev + 1);
    } else {
      backgroundRef.current.style.backgroundColor = backgroundConstants[0];
      localStorage.setItem("background-color", backgroundConstants[0]);
      setBgIndex(0);
    }
  };

  useEffect(() => {
    const storedBgColor = getStoredCanvasBg()
    if (storedBgColor) {
      backgroundRef.current.style.backgroundColor = storedBgColor;
    }
  }, []);

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
          <Suspense fallback={<Loader />}>
            <Sidebar />
          </Suspense>
        </div>
      )}

      {/* Whiteboard */}
      <div className={`flex-1`}>
        <Suspense fallback={<Loader />}>
          <Whiteboard toggleBackground={toggleBackground} />
        </Suspense>
      </div>
    </div>
  );
}

export default Canvas;
