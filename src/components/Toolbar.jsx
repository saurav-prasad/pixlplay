import React, { useRef, useState } from "react";
import {
  Share2,
  Palette,
  Brush,
  OctagonX,
  ListRestart,
  Pen,
  Eraser,
} from "lucide-react";
import isDarkColor from "../utils/isDarkColor";

function Toolbar({
  color,
  setColor,
  setStrokeWidth,
  tool,
  setTool,
  onUndo,
  onRedo,
  onReposition,
  setLines,
  strokeWidth,
  toggleSlider,
  toggleTools,
}) {
  const colorRef = useRef(null);
  const isDark = isDarkColor(color);
  const [visiblePopup, setVisiblePopup] = useState(null); // State to track visibility of the popup

  const handleMouseEnter = (id) => {
    setVisiblePopup(id);
  };

  const handleMouseLeave = () => {
    setVisiblePopup(null);
  };

  const handleEraserClick = () => {
    setTool({
      name: "destination-out",
      component: <Eraser className="h-6 w-6" />,
    });
  };

  return (
    <>
      <div className="flex flex-row space-x-4 relative items-center justify-center border-t py-2 overflow-auto flex-wrap overflow-x-auto hideScrollbar">
        {/* color picker */}
        <div
          title="Color picker"
          onClick={() => colorRef.current.click()}
          style={{ backgroundColor: color }}
          className={`relative cursor-pointer p-2 rounded-full w-fit h-fit`}
        >
          <Palette className={`${isDark ? "text-white" : "text-black"}`} />{" "}
          <input
            ref={colorRef}
            onChange={(e) => setColor(e.target.value)}
            type="color"
            name="color"
            id="color"
            className="absolute -z-10 top-0 left-0 select-none w-0 h-0"
          />
        </div>

        {/* Brush size */}
        <div
          title="Brush size"
          onClick={toggleSlider}
          onMouseEnter={() => handleMouseEnter("size")}
          onMouseLeave={handleMouseLeave}
          className="flex items-center space-x-2 cursor-pointer relative p-2 rounded-full w-fit h-fit border hover:bg-gray-200"
        >
          <Brush className="h-6 w-6 text-gray-900" />
          <Popup isPopupVisible={visiblePopup === "size"} text={"Size"} />
        </div>

        {/* Tools */}
        <div
          title={tool.name}
          onClick={toggleTools}
          onMouseEnter={() => handleMouseEnter("tools")}
          onMouseLeave={handleMouseLeave}
          className="flex items-center space-x-2 cursor-pointer relative p-2 rounded-full w-fit h-fit border hover:bg-gray-200"
        >
          {tool.component}
          <Popup isPopupVisible={visiblePopup === "tools"} text={"Tools"} />
        </div>

        {/* Eraser */}
        <div
          title="Eraser"
          onMouseEnter={() => handleMouseEnter("eraser")}
          onMouseLeave={handleMouseLeave}
          onClick={handleEraserClick}
          className={`${
            tool.name === "destination-out" && "bg-gray-200"
          } flex items-center space-x-2 cursor-pointer relative p-2 rounded-full w-fit h-fit border hover:bg-gray-200`}
        >
          <Eraser className="h-6 w-6 text-gray-900" />
          <Popup isPopupVisible={visiblePopup === "eraser"} text={"Eraser"} />
        </div>

        {/* Reposition */}
        <div
          title="Reposition"
          onMouseEnter={() => handleMouseEnter("reposition")}
          onMouseLeave={handleMouseLeave}
          onClick={onReposition}
          className={`relative cursor-pointer p-2 rounded-full w-fit h-fit border hover:bg-gray-200`}
        >
          <ListRestart className="h-6 w-6 text-gray-900" />
          <Popup
            isPopupVisible={visiblePopup === "reposition"}
            text={"Reposition"}
          />
        </div>

        {/* Clear */}
        <div
          title="Clear Canvas"
          onClick={() => setLines([])}
          onMouseEnter={() => handleMouseEnter("clear")}
          onMouseLeave={handleMouseLeave}
          className={`relative cursor-pointer p-2 rounded-full w-fit h-fit border hover:bg-gray-200`}
        >
          <OctagonX className="h-6 w-6 text-gray-900" />
          <Popup isPopupVisible={visiblePopup === "clear"} text={"Clear"} />
        </div>

        {/* Share */}
        <div
          title="Share Canvas"
          onMouseEnter={() => handleMouseEnter("share")}
          onMouseLeave={handleMouseLeave}
          className={`relative cursor-pointer p-2 rounded-full w-fit h-fit border hover:bg-gray-200 hidden md:block`}
        >
          <Share2 className="h-6 w-6 text-gray-900" />
          <Popup isPopupVisible={visiblePopup === "share"} text={"Share"} />
        </div>
      </div>
    </>
  );
}

export default Toolbar;

export function Popup({ isPopupVisible, text, bottomValue, rightValue }) {
  return (
    <p
      className={`${
        isPopupVisible ? "block" : "hidden"
      } transition duration-1000 absolute ${
        bottomValue ? bottomValue : "bottom-6"
      } 
     ${
       rightValue ? rightValue : "-right-5"
     } px-1 text-nowrap bg-[#dc5a5a] font-medium rounded-md text-white text-xs text-center z-10 select-none`}
    >
      {text}
    </p>
  );
}
