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
import { FileLock2, Lock, Pen } from "lucide-react";
import Users from "./Users";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import getCanvas from "../utils/getCanvas";
import { addCanvas, updateCanvas } from "../app/features/canvases";
import throttling from "../utils/throttling";
import updateCanvasFunc from "../utils/updateCanvas";
import { setAlert } from "../app/features/alert";
import OnlineUsers from "./OnlineUsers";
import socket from "../socket/socket";

function Whiteboard({ toggleBackground }) {
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
  const [isSaveLoading, setIsSaveLoading] = useState(false);
  // useRef
  const isDrawing = useRef(false);
  const stageRef = useRef(null);
  const isPanning = useRef(false); // Track panning state
  const panStart = useRef({ x: 0, y: 0 });
  const lastTouchDistance = useRef(null); // For pinch zoom
  const touchPanStart = useRef(null); // For panning
  const timeoutRef = useRef(null); // Ref to store the setTimeout ID
  const saveChangesRef = useRef(null);
  const saveChangesLinesRef = useRef(null);
  // custom hooks
  const { width, height } = useWindowDimensions();
  const isMobile = useDeviceType();

  // use selector
  const canvasesReducer = useSelector((state) => state.canvasesReducer);
  const { user } = useSelector((state) => state.authReducer);
  const canvasAdmin = useSelector((state) => state.canvasAdminReducer);
  // dispatch
  const dispatch = useDispatch();
  // use params
  const params = useParams();
  const canvasId = params.id;

  // get canvas when mounted
  useEffect(() => {
    async function fetchData() {
      // if (user) {
      setIsLoading(true);
      try {
        if (user) {
          if (canvasesReducer[canvasId] && user) {
            setLines(canvasesReducer[canvasId]);
          } else {
            const response = await getCanvas(canvasId);
            if (response.canvas) {
              dispatch(addCanvas(response));
            } else {
              dispatch(addCanvas({ ...response, canvas: [] }));
            }
          }
        }
        setIsCanvasNotFound(false);
      } catch (error) {
        if (error?.response?.status === 405) {
          setIsCanvasNotFound(true);
        }
        console.error(error);
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
      // }
    }
    fetchData();
  }, [canvasId, canvasesReducer, user]);

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
    try {
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
    } catch (error) {
      console.error(error);
    }
  };

  const handleMouseUp = async () => {
    // End panning or drawing based on the current state
    if (isPanning.current) {
      isPanning.current = false; // End panning
    } else if (isDrawing.current) {
      isDrawing.current = false; // End drawing
    }
    dispatch(updateCanvas({ id: canvasId, canvas: lines }));
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
    if (lines.length > 0) {
      // console.log(lines.length);
      setRedo([...redo, lines[lines.length - 1]]);
      setLines((e) => e.slice(0, e.length - 1));
      // socket.emit("canvas-update", {
      //   canvasId,
      //   lines: lines.slice(0, lines.length - 1),
      // });
      setIsCanvasUpdate(true);
      dispatch(
        updateCanvas({ id: canvasId, canvas: lines.slice(0, lines.length - 1) })
      );
    }
  };

  // redo function
  const onRedo = (e) => {
    e.preventDefault();
    if (redo.length > 0) {
      setLines([...lines, redo[redo.length - 1]]);
      setRedo((e) => e.slice(0, e.length - 1));
      setIsCanvasUpdate(true);
      dispatch(
        updateCanvas({
          id: canvasId,
          canvas: [...lines, redo[redo.length - 1]],
        })
      );
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
    dispatch(updateCanvas({ id: canvasId, canvas: lines }));
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
        setIsSaveLoading(true);
        try {
          if (user) {
            const result = await updateCanvasFunc(canvasId, lines);
            if (canvasAdmin.includes(canvasId)) {
              socket.emit("canvas-update", { canvasId, lines });
            }
          }
        } catch (error) {
          console.error("Error updating canvas:", error);
        } finally {
          setIsCanvasUpdate(false); // Reset the state after the update
          timeoutRef.current = null; // Clear the ref
          setIsSaveLoading(false);
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

  // handle on save button click
  const onSaveChanges = (e) => {
    if (lines.length > 0) {
      saveChangesLinesRef.current = lines;
      saveChangesRef.current();
    }
  };

  // listen to socket updated from other collaborators
  useEffect(() => {
    if (canvasAdmin.includes(canvasId)) {
      socket.on("updated-canvas", async ({ lines, canvasId }) => {
        const result = await updateCanvasFunc(canvasId, lines);
        setLines(lines);
        dispatch(updateCanvas({ id: canvasId, canvas: lines }));
      });
    }
    return () => {
      socket.off("updated-canvas");
    };
  }, [canvasId, canvasAdmin]);

  // handle on save button click => throttling
  useEffect(() => {
    saveChangesRef.current = throttling(async () => {
      try {
        setIsSaveLoading(true);
        if (user) {
          const result = await updateCanvasFunc(
            canvasId,
            saveChangesLinesRef.current
          );
          dispatch(setAlert({ text: "Changes uploaded to cloud" }));
        }
      } catch (error) {
        console.log(error);
        console.error("Error updating canvas:", error);
        dispatch(
          setAlert({
            type: "danger",
            text: error.response.data.message || "Something went wrong!",
          })
        );
      } finally {
        setIsSaveLoading(false);
      }
    }, 4000);
  }, [canvasId]);

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
            {!isLoading && lines.length === 0 && !isCanvasNotFound && (
              <Text
                fontSize={isMobile ? 33 : 50}
                text="Just start drawing"
                x={isMobile ? -120 : -200}
                y={0}
              />
            )}
            {lines.map((line, i) => (
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
            isSaveLoading={isSaveLoading}
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
            onSaveChanges={onSaveChanges}
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
          isSaveLoading={isSaveLoading}
          onSaveChanges={onSaveChanges}
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
                Select a Canvas first!
              </h1>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
// ? breakpoint 768px => md
export default Whiteboard;
