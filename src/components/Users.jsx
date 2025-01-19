import React, { useState } from "react";
import { Popup } from "./Toolbar";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function Users() {
  const [visiblePopup, setVisiblePopup] = useState(null); // State to track visibility of the popup
  const { user } = useSelector((state) => state.authReducer);

  const allCollaborators = useSelector(
    (state) => state.allCollaboratorsReducer
  );
  const canvasId = useParams().id;
  const handleMouseEnter = (id) => {
    setVisiblePopup(id);
  };

  const handleMouseLeave = () => {
    setVisiblePopup(null);
  };

  return (
    <>
      {allCollaborators[canvasId] && user && (
        <div className="flex flex-row gap-3 absolute right-2 top-3 flex-wrap sm:max-w-fit">
          {allCollaborators[canvasId]?.map(
            ({ profilePhoto, userId, username }, i) =>
              allCollaborators[canvasId].length > 1 && (
                <div
                  onMouseEnter={() => handleMouseEnter(i)}
                  onMouseLeave={handleMouseLeave}
                  className="relative select-none"
                  key={i}
                >
                  <img
                    className="w-7 h-7 rounded-full ring-1 ring-white"
                    src={profilePhoto}
                    alt={i}
                  />
                  <Popup
                    bottomValue={"-bottom-5"}
                    rightValue={"right-0"}
                    isPopupVisible={visiblePopup === i}
                    text={username}
                  />
                </div>
              )
          )}
        </div>
      )}
    </>
  );
}

export default Users;
