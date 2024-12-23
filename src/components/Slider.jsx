import React from "react";

function Slider({ setStrokeWidth, toggleSlider }) {
  return (
    <div className="absolute bottom-[4.2rem] left-[40%] select-none flex flex-col space-y-4">
      <input
        onMouseUp={toggleSlider}
        onTouchEnd={toggleSlider}
        type="range"
        min="2"
        max="50"
        defaultValue={10}
        onChange={(e) => setStrokeWidth(Number(e.target.value))}
        className="appearance-none w-44 h-2 bg-gray-300 rounded-full slider-thumb"
        name="strokeWidth"
        id="strokeWidth"
      />
    </div>
  );
}

export default Slider;
