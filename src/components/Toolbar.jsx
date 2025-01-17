import React, { useRef, useState } from "react";
import {
  Share2,
  Palette,
  Brush,
  OctagonX,
  ListRestart,
  Pen,
  Eraser,
  SwitchCamera,
  TriangleAlert,
  CloudUpload,
} from "lucide-react";
import isDarkColor from "../utils/isDarkColor";
import { useDispatch, useSelector } from "react-redux";
import updateCanvasFunc from "../utils/updateCanvas";
import { updateCanvas } from "../app/features/canvases";
import { Zoom } from "react-awesome-reveal";
import OnlineUsers from "./OnlineUsers";
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
  toggleBackground,
  canvasId,
  onSaveChanges,
}) {
  const colorRef = useRef(null);
  const isDark = isDarkColor(color);
  const [visiblePopup, setVisiblePopup] = useState(null); // State to track visibility of the popup
  const dispatch = useDispatch();
  const [isClearCanvasPopup, setIsClearCanvasPopup] = useState(false);
  const [isOnlineUsersPopup, setIsOnlineUsersPopup] = useState(false);
  const [isClearCanvas, setIsClearCanvas] = useState(false);

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

  const handleClearCanvas = async (result = false) => {
    if (result) {
      try {
        setLines([]);
        dispatch(updateCanvas({ id: canvasId, canvas: [] }));
        const result = await updateCanvasFunc(canvasId, []);
      } catch (error) {
        console.error(error);
      } finally {
        setIsClearCanvas(false);
      }
    }
  };

  const toggleClearCanvasPopup = () => {
    setIsClearCanvasPopup(!isClearCanvasPopup);
  };

  const toggleOnlineUsersPopup = () => {
    setIsOnlineUsersPopup(!isOnlineUsersPopup);
  };

  return (
    <>
      <div className="bg-white flex flex-row space-x-4 relative items-center justify-center border-t py-2 overflow-auto flex-wrap overflow-x-auto hideScrollbar">
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

        {/* Clear canvas */}
        <div
          title="Clear Canvas"
          onClick={toggleClearCanvasPopup}
          onMouseEnter={() => handleMouseEnter("clear")}
          onMouseLeave={handleMouseLeave}
          className={`relative cursor-pointer p-2 rounded-full w-fit h-fit border hover:bg-gray-200`}
        >
          <OctagonX className="h-6 w-6 text-gray-900" />
          <Popup isPopupVisible={visiblePopup === "clear"} text={"Clear"} />
        </div>
        {/* Switch Background */}
        <div
          title="Change Background"
          onClick={toggleBackground}
          onMouseEnter={() => handleMouseEnter("background")}
          onMouseLeave={handleMouseLeave}
          className={`relative cursor-pointer p-2 rounded-full w-fit h-fit border hover:bg-gray-200`}
        >
          <SwitchCamera className="h-6 w-6 text-gray-900" />
          <Popup
            isPopupVisible={visiblePopup === "background"}
            text={"Backdrop"}
          />
        </div>

        {/* Share */}
        <div
          title="Share Canvas"
          onClick={toggleOnlineUsersPopup}
          onMouseEnter={() => handleMouseEnter("share")}
          onMouseLeave={handleMouseLeave}
          className={`relative cursor-pointer p-2 rounded-full w-fit h-fit border hover:bg-gray-200 hidden md:block`}
        >
          <Share2 className="h-6 w-6 text-gray-900" />
          <Popup isPopupVisible={visiblePopup === "share"} text={"Share"} />
        </div>
        {/* Save */}
        <div
          onClick={onSaveChanges}
          title="Save changes"
          onMouseEnter={() => handleMouseEnter("save")}
          onMouseLeave={handleMouseLeave}
          className={`relative cursor-pointer p-2 rounded-full w-fit h-fit border hover:bg-gray-200 hidden md:block`}
        >
          <CloudUpload className="h-6 w-6 text-gray-900" />
          <Popup isPopupVisible={visiblePopup === "save"} text={"Save"} />
        </div>
      </div>
      {isClearCanvasPopup && (
        <ClearCanvasPopupModal
          toggleClearCanvasPopup={toggleClearCanvasPopup}
          getResult={handleClearCanvas}
        />
      )}
      {isOnlineUsersPopup && (
        <OnlineUsers
          toggleOnlineUsersPopup={toggleOnlineUsersPopup}
        />
      )}
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

// clear canvas popup
function ClearCanvasPopupModal({ toggleClearCanvasPopup, getResult }) {
  // Handles button click and passes the result to the parent
  const onClick = (e, result) => {
    e.preventDefault();
    getResult(result); // Send result to the parent
    toggleClearCanvasPopup(); // Close the modal
  };

  // Prevents the click event from propagating to the overlay
  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  return (
    <>
      <div
        onClick={toggleClearCanvasPopup}
        className="absolute z-[100] flex justify-center items-center left-0 top-0 w-full h-[99vh] m-0"
      >
        <Zoom duration={200}>
          <div
            onClick={stopPropagation}
            className="flex flex-col justify-center max-w-xl mx-2 shadow-2xl shadow-red-400"
          >
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 rounded-t-md">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
                  <TriangleAlert
                    aria-hidden="true"
                    className="size-6 text-red-600"
                  />
                </div>
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <span
                    as="h3"
                    className="text-base font-semibold text-gray-900"
                  >
                    Clear Canvas
                  </span>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Are you sure you want to clear your canvas? All of your
                      work will be permanently removed. This action cannot be
                      undone.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 rounded-b-md">
                <button
                  type="button"
                  onClick={(e) => onClick(e, true)}
                  className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                >
                  Clear
                </button>
                <button
                  type="button"
                  onClick={(e) => onClick(e, false)}
                  data-autofocus
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </Zoom>
      </div>
    </>
  );
}

// clear canvas popup
function OnlineUsers1({ toggleOnlineUsersPopup, getResult }) {
  // Handles button click and passes the result to the parent
  const onClick = (e, result) => {
    e.preventDefault();
    getResult(result); // Send result to the parent
    toggleOnlineUsersPopup(); // Close the modal
  };

  // Prevents the click event from propagating to the overlay
  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  const onlineUsersReducer = useSelector((state) => state.onlineUsersReducer);

  return (
    <>
      <div
        onClick={toggleOnlineUsersPopup}
        className="absolute z-[100] flex justify-center items-center left-0 top-0 w-full h-[99vh] m-0"
      >
        <Zoom duration={200}>
          <div
            onClick={stopPropagation}
            className="flex flex-col justify-center md:w-[30vw] mx-2 shadow-2xl shadow-red-400"
          >
            <div className="bg-gray-50 px-1 py-3 flex flex-col justify-center items-center sm:px-3 rounded-md">
              <h1 className="font-bold underline mb-4">All Online Users</h1>
              <div className="gap-3 max-h-96 overflow-auto w-full flex flex-col">
                {Object.keys(onlineUsersReducer).map((userId, index) => (
                  <List
                    key={index}
                    name={onlineUsersReducer[userId].username}
                    icon={onlineUsersReducer[userId].profilePhoto}
                    toolName={onlineUsersReducer[userId].username}
                  />
                ))}
              </div>
            </div>
          </div>
        </Zoom>
      </div>
    </>
  );
}
function List({ name, icon, setTool, toolName, tool }) {
  const onClick = () => {
    // setTool({ name: toolName, component: icon });
  };

  return (
    <div
      onClick={onClick}
      className={`px-1 py-1 w-full rounded-md flex justify-start items-center gap-2 hover:bg-slate-200 transition-all cursor-pointer`}
    >
      <img
        src={icon}
        title="Eraser"
        className="flex items-center space-x-2 cursor-pointer relative rounded-full w-8 h-8 border hover:bg-gray-200"
      />
      <div className="flex-1 font-medium dark:text-gray-900 flex justify-start items-center">
        <div className="select-none">{name}</div>
      </div>
      <button
        type="submit"
        className="rounded-md bg-indigo-600 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-00 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Remove
      </button>
    </div>
  );
}
