import React, { useRef, useState } from "react";
import {
  Share2,
  Palette,
  Brush,
  OctagonX,
  ListRestart,
  Pen,
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
}) {
  const colorRef = useRef(null);
  const isDark = isDarkColor(color);
  const [isPopupVisible, setPopupVisible] = useState(false); // State to track visibility of the popup

  const togglePopupVisible = () => {
    setPopupVisible(!isPopupVisible); // Toggle popup visibility
  };
  return (
    <>
      <div className="flex flex-row space-x-3 relative items-center justify-center border-t py-2 overflow-auto flex-wrap">
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
          {/* <Popup isPopupVisible={isPopupVisible} text={"Color"} /> */}
        </div>

        {/* Brush size */}
        <div
          title="Brush size"
          onMouseEnter={togglePopupVisible}
          onMouseLeave={togglePopupVisible}
          onTouchEnd={togglePopupVisible}
          onTouchStart={togglePopupVisible}
          onClick={toggleSlider}
          className="flex items-center space-x-2 cursor-pointer relative p-2 rounded-full w-fit h-fit border hover:bg-gray-200"
        >
          <Brush className="h-6 w-6 text-gray-600" />
          {/* Visual Indicator */}

          {/* <Popup isPopupVisible={isPopupVisible} text={"Size"} /> */}
          {/* <p className="text-md font-medium text-gray-700">Size</p> */}
        </div>

        <select
          title="Tools"
          value={tool}
          onChange={(e) => {
            setTool(e.target.value);
          }}
        >
          <option value="source-over">
            <div>
              <Pen className="text-red-500" />{" "}
            </div>
            pen
          </option>
          <option value="xor">Color Invert</option>
          <option value="lighter">Lighter</option>
          <option value="multiply">Multiply</option>
          <option value="screen">Screen</option>
          <option value="overlay">Overlay</option>
          <option value="destination-out">Eraser</option>
        </select>

        {/* Reposition */}
        <div
          title="Reposition"
          onClick={onReposition}
          className={`relative cursor-pointer p-2 rounded-full w-fit h-fit border hover:bg-gray-200`}
        >
          <ListRestart />

          {/* <Popup isPopupVisible={isPopupVisible} text={"Color"} /> */}
        </div>
        {/* Clear */}
        <div
          title="Clear Canvas"
          onClick={() => setLines([])}
          className={`relative cursor-pointer p-2 rounded-full w-fit h-fit border hover:bg-gray-200`}
        >
          <OctagonX />

          {/* <Popup isPopupVisible={isPopupVisible} text={"Color"} /> */}
        </div>

        {/* Share */}
        <div
          title="Share Canvas"
          className={`relative cursor-pointer p-2 rounded-full w-fit h-fit border hover:bg-gray-200`}
        >
          <Share2 />
          {/* <Popup isPopupVisible={isPopupVisible} text={"Color"} /> */}
        </div>
      </div>
    </>
  );
}

export default Toolbar;

function Popup({ isPopupVisible, text }) {
  // const [isPopupVisible, setPopupVisible] = useState(false); // State to track visibility of the popup

  return (
    <p
      className={`${
        isPopupVisible ? "block" : "hidden"
      } transition duration-1000 absolute -bottom-4 px-1 right-0 bg-[#dc5a5a] font-medium rounded-md text-white text-sm`}
    >
      {text}
    </p>
  );
}
// function BrushSizeSlider() {
//   const [brushSize, setBrushSize] = useState(10);
//   const [isSliderVisible, setSliderVisible] = useState(false); // State to track visibility of the slider

//   const toggleSlider = () => {
//     setSliderVisible(!isSliderVisible); // Toggle slider visibility
//   };

//   return (
//     <div className="relative flex flex-col items-center space-y-4">
//       {/* Slider Title */}
//       <div onClick={toggleSlider} className="flex items-center space-x-2">
//         <Brush className="h-6 w-6 text-gray-600" />
//         {/* Visual Indicator */}
//         <div
//           style={{ width: brushSize, height: brushSize }}
//           className="rounded-full bg-gray-600"
//         ></div>
//         {/* <p className="text-md font-medium text-gray-700">Size</p> */}
//       </div>

//       {/* Range Slider */}
//       {/* <input
//         type="range"
//         min="1"
//         max="50"
//         value={brushSize}
//         onChange={(e) => setBrushSize(e.target.value)}
//         className="slider w-60 appearance-none bg-gray-300 rounded-full h-2"
//       /> */}

//       {/* Slider (Appears when isSliderVisible is true) */}
//       {/* <div
//         className={`transition-all duration-500 transform ${
//           isSliderVisible
//             ? "opacity-100 -translate-y-44"
//             : "opacity-0 translate-y-4"
//         } relative w-60 mt-4`} // Smooth transition for sliding in/out
//       >
//         <input
//           type="range"
//           min="1"
//           max="50"
//           value={brushSize}
//           onChange={(e) => setBrushSize(e.target.value)}
//           className="appearance-none w-full h-2 bg-gray-300 rounded-full slider-thumb"
//         />
//       </div> */}
//     </div>
//   );
// }
