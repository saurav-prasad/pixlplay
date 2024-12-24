import React from "react";
import {  Fade } from "react-awesome-reveal";

function Slider({ setStrokeWidth, toggleSlider,strokeWidth }) {
  return (
    <Fade duration={150}>
      <div className="absolute bottom-[4.2rem] left-[40%] select-none flex flex-col space-y-4">
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
    </Fade>
  );
}

export default Slider;
