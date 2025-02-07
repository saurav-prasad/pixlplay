import { useRef, useState, useEffect } from "react";
import { Stage, Layer, Line, Text } from "react-konva";
import useWindowDimensions from "../hooks/useWindowDimensions";
import useDeviceType from "../hooks/useDeviceType";
import calculateTouchDistance from "../utils/calculateTouchDistance";
import calculateTouchMidpoint from "../utils/calculateTouchMidpoint";
import Toolbar from "./Toolbar";
import UndoRedo from "./UndoRedo";
import Slider from "./Slider";
import Tools from "./Tools";
import { FileLock2, Pen } from "lucide-react";
import Users from "./Users";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import socket from "../socket/socket";

function LiveWhiteboard({ toggleBackground }) {
  // useState
  const [tool, setTool] = useState({
    name: "source-over",
    component: <Pen className="h-5 w-5 text-gray-900" />,
  });
  const [color, setColor] = useState("#000000");
  const [strokeWidth, setStrokeWidth] = useState(10);
  const [lines, setLines] = useState([]);
  const [redo, setRedo] = useState([]);
  const [scale, setScale] = useState(1);
  const [stagePosition, setStagePosition] = useState({
    x: 0,
    y: 0,
  });
  const [isSliderVisible, setSliderVisible] = useState(false); // State to track visibility of the slider
  const [isToolsVisible, setToolsVisible] = useState(false); // State to track visibility of the tools
  const [isCanvasNotFound, setIsCanvasNotFound] = useState(false);
  const [isCanvasUpdate, setIsCanvasUpdate] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [previousPosition, setPreviousPosition] = useState({});
  // useRef
  const isDrawing = useRef(false);
  const stageRef = useRef(null);
  const isPanning = useRef(false); // Track panning state
  const panStart = useRef({ x: 0, y: 0 });
  const lastTouchDistance = useRef(null); // For pinch zoom
  const touchPanStart = useRef(null); // For panning
  const timeoutRef = useRef(null); // Ref to store the setTimeout ID
  // custom hooks
  const { width, height } = useWindowDimensions();
  const isMobile = useDeviceType();

  // use selector
  const { user } = useSelector((state) => state.authReducer);
  const allCollaborators = useSelector(
    (state) => state.allCollaboratorsReducer
  );
  // use params
  const params = useParams();
  const canvasId = params.id;

  // check if canvas is accessable
  useEffect(() => {
    setIsLoading(true);
    try {
      socket.emit("if-canvas-accessable", { canvasId });
      socket.on("canvas-accessable", ({ success, message, lines }) => {
        if (success) {
          console.log("object1")
          setLines(lines);
          setIsCanvasNotFound(false);
        } else {
          console.log("object2")
          setIsCanvasNotFound(true);
        }
      });
      socket.on("updated-canvas", ({ lines, canvasId }) => {
        if (canvasId === params.id) {
          setLines(lines);
        }
      });
    } catch (error) {
      console.log(error);
    } finally {
      if (previousPosition[canvasId]) {
        setStagePosition(previousPosition[canvasId][0]);
        setScale(previousPosition[canvasId][1]);
      } else {
        setStagePosition({
          x: width / 2,
          y: height / 2,
        });
        setScale(1);
      }
      setIsLoading(false);
    }

    return () => {
      socket.off("if-canvas-accessable");
      socket.off("canvas-accessable");
      socket.off("updated-canvas");
    };
  }, [canvasId, allCollaborators]);

  // check previous canvas position
  useEffect(() => {
    setPreviousPosition((prev) => ({
      ...prev,
      [canvasId]: [stagePosition, scale],
    }));
  }, [stagePosition, scale]);

  // toggle pen size selection menu
  const toggleSlider = () => {
    setSliderVisible(!isSliderVisible); // Toggle slider visibility
  };

  // toggle tools selection menu
  const toggleTools = () => {
    setToolsVisible(!isToolsVisible); // Toggle slider visibility
  };

  // Set initial stage position
  useEffect(() => {
    setStagePosition({
      x: width / 2,
      y: height / 2,
    });
  }, [width, height]);

  // Handle mouse/touch drawing
  const handleMouseDown = (e) => {
    if (e.evt.ctrlKey) {
      // Start panning
      isPanning.current = true;
      const stage = stageRef.current;
      const pointer = stage.getPointerPosition();
      panStart.current = {
        x: pointer.x - stagePosition.x,
        y: pointer.y - stagePosition.y,
      };
    } else {
      // Start drawing
      isDrawing.current = true;
      const stage = stageRef.current;

      // Get the transformed pointer position
      const pos = stage.getPointerPosition();
      const transformedPos = {
        x: (pos.x - stagePosition.x) / scale,
        y: (pos.y - stagePosition.y) / scale,
      };

      setLines([
        ...lines,
        {
          tool: tool.name,
          color,
          strokeWidth,
          points: [transformedPos.x, transformedPos.y],
        },
      ]);
    }
  };

  const handleMouseMove = (e) => {
    if (isPanning.current) {
      // Pan the stage
      const stage = stageRef.current;
      const pointer = stage.getPointerPosition();
      setStagePosition({
        x: pointer.x - panStart.current.x,
        y: pointer.y - panStart.current.y,
      });
    } else if (isDrawing.current) {
      const stage = stageRef.current;

      // Get the transformed pointer position
      const pos = stage.getPointerPosition();
      const transformedPos = {
        x: (pos.x - stagePosition.x) / scale,
        y: (pos.y - stagePosition.y) / scale,
      };

      // Safely update the last line
      const updatedLines = [...lines];
      let lastLine = updatedLines[updatedLines.length - 1];
      lastLine.points = lastLine.points.concat([
        transformedPos.x,
        transformedPos.y,
      ]);
      lines.splice(lines.length - 1, 1, lastLine);
      setLines(updatedLines); // Update the state
    }
  };

  const handleMouseUp = async () => {
    // End panning or drawing based on the current state
    if (isPanning.current) {
      isPanning.current = false; // End panning
    } else if (isDrawing.current) {
      isDrawing.current = false; // End drawing
    }
    setIsCanvasUpdate(true);
  };

  // Handle mouse wheel for zooming
  const handleWheel = (e) => {
    e.evt.preventDefault();
    const stage = stageRef.current;
    const oldScale = stage.scaleX();

    const pointer = stage.getPointerPosition();
    const zoomAmount = e.evt.deltaY > 0 ? 0.95 : 1.05;
    const newScale = Math.max(0.1, Math.min(oldScale * zoomAmount, 5)); // Limit zoom level

    const mousePointTo = {
      x: (pointer.x - stagePosition.x) / oldScale,
      y: (pointer.y - stagePosition.y) / oldScale,
    };

    setScale(newScale);
    setStagePosition({
      x: pointer.x - mousePointTo.x * newScale,
      y: pointer.y - mousePointTo.y * newScale,
    });
  };

  // undo function
  const onUndo = (e) => {
    e.preventDefault();
    if (lines?.length > 0) {
      // console.log(lines.length);
      setRedo([...redo, lines[lines?.length - 1]]);
      setLines((e) => e.slice(0, e.length - 1));
      setIsCanvasUpdate(true);
    }
  };

  // redo function
  const onRedo = (e) => {
    e.preventDefault();
    if (redo.length > 0) {
      setLines([...lines, redo[redo?.length - 1]]);
      setRedo((e) => e.slice(0, e.length - 1));
      setIsCanvasUpdate(true);
    }
  };

  // redo function
  const onReposition = (e) => {
    e.preventDefault();
    setStagePosition({
      x: width / 2,
      y: height / 2,
    });
    setScale(1);
  };

  // Handle touch start
  const handleTouchStart = (e) => {
    const stage = stageRef.current;

    if (e.evt.touches.length === 1) {
      // Single finger: start drawing
      isDrawing.current = true;
      const touch = e.evt.touches[0];
      const pointerPos = stage.getPointerPosition();

      const transformedPos = {
        x: (pointerPos.x - stagePosition.x) / scale,
        y: (pointerPos.y - stagePosition.y) / scale,
      };

      setLines([
        ...lines,
        {
          tool: tool.name,
          color,
          strokeWidth,
          points: [transformedPos.x, transformedPos.y],
        },
      ]);
    } else if (e.evt.touches.length === 2) {
      // Two fingers: start panning or zooming
      e.evt.preventDefault();
      lastTouchDistance.current = calculateTouchDistance(e);
      touchPanStart.current = {
        x: stagePosition.x,
        y: stagePosition.y,
        touchMidpoint: calculateTouchMidpoint(e),
      };
    }
  };

  // Handle touch move
  const handleTouchMove = (e) => {
    const stage = stageRef.current;

    if (e.evt.touches.length === 1 && isDrawing.current) {
      // Single finger: drawing
      const touch = e.evt.touches[0];
      const pointerPos = stage.getPointerPosition();

      const transformedPos = {
        x: (pointerPos.x - stagePosition.x) / scale,
        y: (pointerPos.y - stagePosition.y) / scale,
      };

      const updatedLines = [...lines]; // Create a new array
      let lastLine = updatedLines[updatedLines.length - 1];
      lastLine.points = lastLine.points.concat([
        transformedPos.x,
        transformedPos.y,
      ]);
      lines.splice(lines.length - 1, 1, lastLine);

      setLines(lines.concat());
    } else if (e.evt.touches.length === 2) {
      // Two fingers: panning or zooming
      e.evt.preventDefault();

      const newDistance = calculateTouchDistance(e);
      const touchMidpoint = calculateTouchMidpoint(e);

      // Handle zooming
      if (lastTouchDistance.current) {
        const scaleFactor = newDistance / lastTouchDistance.current;
        const newScale = Math.max(0.1, Math.min(scale * scaleFactor, 5)); // Limit zoom levels
        const stagePos = {
          x:
            touchMidpoint.x -
            (touchMidpoint.x - touchPanStart.current.touchMidpoint.x) *
              newScale,
          y:
            touchMidpoint.y -
            (touchMidpoint.y - touchPanStart.current.touchMidpoint.y) *
              newScale,
        };

        setScale(newScale);
        setStagePosition(stagePos);
      }

      // Handle panning
      const dx =
        e.evt.touches[0].clientX - touchPanStart.current.touchMidpoint.x;
      const dy =
        e.evt.touches[0].clientY - touchPanStart.current.touchMidpoint.y;

      setStagePosition({
        x: touchPanStart.current.x + dx,
        y: touchPanStart.current.y + dy,
      });

      lastTouchDistance.current = newDistance;
    }
  };

  // Handle touch end
  const handleTouchEnd = () => {
    isDrawing.current = false;
    lastTouchDistance.current = null;
    touchPanStart.current = null;
    setIsCanvasUpdate(true);
  };

  // saving the lines to db whenever the lines changes
  useEffect(() => {
    if (isCanvasUpdate && user) {
      // Clear the existing timeout if any
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Set a new timeout and store its ID in the ref
      timeoutRef.current = setTimeout(async () => {
        try {
          if (user) {
            socket.emit("canvas-update", { canvasId, lines });
          }
        } catch (error) {
          console.error("Error updating canvas:", error);
        } finally {
          setIsCanvasUpdate(false); // Reset the state after the update
          timeoutRef.current = null; // Clear the ref
        }
      }, 500);
    }

    // Cleanup the timeout when the component unmounts
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      socket.off("canvas-update");
    };
  }, [isCanvasUpdate, user, canvasId, lines]);

  return (
    <>
      <div className="w-fit border float-end relative">
        <Stage
          className="cursor-cell"
          ref={stageRef}
          width={width}
          height={height}
          scaleX={scale}
          scaleY={scale}
          x={stagePosition.x}
          y={stagePosition.y}
          //mouse
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          //wheel
          onWheel={handleWheel}
          //touch
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <Layer>
            {!isLoading && lines?.length === 0 && !isCanvasNotFound && (
              <Text
                fontSize={isMobile ? 33 : 50}
                text="Just start drawing"
                x={isMobile ? -120 : -200}
                y={0}
              />
            )}
            {lines?.map((line, i) => (
              <Line
                key={i}
                points={line.points}
                stroke={line.color}
                strokeWidth={line.strokeWidth}
                tension={0.5}
                lineCap="round"
                lineJoin="round"
                globalCompositeOperation={line.tool}
              />
            ))}
          </Layer>
        </Stage>
        {/* Toobar */}
        <div className="shadow-[2px_5px_13px_0px_rgb(181,181,181)]">
          <Toolbar
            canvasId={canvasId}
            toggleBackground={toggleBackground}
            color={color}
            setColor={setColor}
            strokeWidth={strokeWidth}
            setStrokeWidth={setStrokeWidth}
            tool={tool}
            setTool={setTool}
            onUndo={onUndo}
            onRedo={onRedo}
            onReposition={onReposition}
            setLines={setLines}
            lines={lines}
            toggleSlider={toggleSlider}
            toggleTools={toggleTools}
            onSaveChanges={() => {}}
          />
        </div>
        {isSliderVisible && (
          <Slider
            isSliderVisible={isSliderVisible}
            strokeWidth={strokeWidth}
            toggleSlider={toggleSlider}
            setStrokeWidth={setStrokeWidth}
          />
        )}
        <UndoRedo
          onSaveChanges={() => {}}
          linesArr={lines}
          redoArr={redo}
          onUndo={onUndo}
          onRedo={onRedo}
        />
        {isToolsVisible && (
          <Tools
            isToolsVisible={isToolsVisible}
            tool={tool}
            setTool={setTool}
            toggleTools={toggleTools}
          />
        )}
        <Users />
        {/* Loader */}
        {isLoading && (
          <div className="absolute top-0 md:left-4 left-0 bg-[#3636367c] w-[-webkit-fill-available] h-full flex justify-center items-center z-[9]">
            {/* <h1 className="text-3xl text-white font-bold flex justify-center items-center gap-2"> */}
            <span className="loader4"></span>
            {/* </h1> */}
          </div>
        )}
        {isCanvasNotFound && (
          <div className="absolute top-0 md:left-3 bg-[#3636367c] w-[-webkit-fill-available] h-full flex justify-center items-center z-[9]">
            <div className="shadow-2xl shadow-[#9e99bf00] bg-[#9e99bf00] backdrop-blur-[3px] px-2 py-3 rounded-full">
              <h1 className="text-3xl text-white font-bold flex justify-center items-center gap-2">
                <FileLock2 className="w-8 h-8 text-[#f5dddd]" />
                Canvas not accessable!
              </h1>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
// ? breakpoint 768px => md
export default LiveWhiteboard;
