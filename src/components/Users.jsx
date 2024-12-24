import React, { useState } from "react";
import { Popup } from "./Toolbar";

function Users({ url }) {
  const [visiblePopup, setVisiblePopup] = useState(null); // State to track visibility of the popup
  const handleMouseEnter = (id) => {
    setVisiblePopup(id);
  };

  const handleMouseLeave = () => {
    setVisiblePopup(null);
  };

  return (
    <div className="flex flex-row gap-3 absolute right-2 top-3 flex-wrap max-w-64 sm:max-w-fit">
      {Array.from({ length: 10 }).map((_, i) => (
        <div
          onMouseEnter={() => handleMouseEnter(i)}
          onMouseLeave={handleMouseLeave}
          className="relative"
          key={i}
        >
          <img
            className="w-7 h-7 rounded-full ring-1 ring-white"
            src={`https://api.dicebear.com/7.x/pixel-art/svg?seed=${i}`}
            alt={i}
          />
          <Popup
            bottomValue={"-bottom-5"}
            rightValue={"right-0"}
            isPopupVisible={visiblePopup === i}
            text={`Saurav ${i}`}
          />
        </div>
      ))}
    </div>
  );
}

export default Users;
