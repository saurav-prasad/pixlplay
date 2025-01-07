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
} from "lucide-react";
import isDarkColor from "../utils/isDarkColor";
import { useDispatch } from "react-redux";
import updateCanvasFunc from "../utils/updateCanvas";
import { updateCanvas } from "../app/features/canvases";
import { Zoom } from "react-awesome-reveal";
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
}) {
  const colorRef = useRef(null);
  const isDark = isDarkColor(color);
  const [visiblePopup, setVisiblePopup] = useState(null); // State to track visibility of the popup
  const dispatch = useDispatch();
  const [isClearCanvasPopup, setIsClearCanvasPopup] = useState(false);
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

  const handleClearCanvas = async (result=false) => {
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
          onMouseEnter={() => handleMouseEnter("share")}
          onMouseLeave={handleMouseLeave}
          className={`relative cursor-pointer p-2 rounded-full w-fit h-fit border hover:bg-gray-200 hidden md:block`}
        >
          <Share2 className="h-6 w-6 text-gray-900" />
          <Popup isPopupVisible={visiblePopup === "share"} text={"Share"} />
        </div>
      </div>
      {isClearCanvasPopup && (
        <ClearCanvasPopupModal
          toggleClearCanvasPopup={toggleClearCanvasPopup}
          getResult={handleClearCanvas}
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
