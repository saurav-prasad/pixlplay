import React from "react";
import { Fade } from "react-awesome-reveal";

function Slider({
  isSliderVisible,
  setStrokeWidth,
  toggleSlider,
  strokeWidth,
}) {
  return (
    //  <Fade duration={150}>
    <div
      className={`${
        isSliderVisible ? "translate-y-0" : "hidden"
      } absolute bottom-[4.2rem] md:left-[40%] left-[30%] select-none flex flex-col space-y-4`}
    >
      <input
        onMouseUp={toggleSlider}
        onTouchEnd={toggleSlider}
        type="range"
        min="2"
        max="50"
        value={strokeWidth}
        onChange={(e) => setStrokeWidth(Number(e.target.value))}
        className="appearance-none w-44 h-2 bg-gray-300 rounded-full slider-thumb"
        name="strokeWidth"
        id="strokeWidth"
      />
    </div>
  );
}

export default Slider;
