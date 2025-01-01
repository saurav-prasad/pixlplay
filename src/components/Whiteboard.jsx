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
import { Pen } from "lucide-react";
import Users from "./Users";

function Pc({toggleBackground}) {
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
  // useRef
  const isDrawing = useRef(false);
  const stageRef = useRef(null);
  const isPanning = useRef(false); // Track panning state
  const panStart = useRef({ x: 0, y: 0 });
  const lastTouchDistance = useRef(null); // For pinch zoom
  const touchPanStart = useRef(null); // For panning

  // custom hooks
  const { width, height } = useWindowDimensions();
  const isMobile = useDeviceType();

  const toggleSlider = () => {
    setSliderVisible(!isSliderVisible); // Toggle slider visibility
  };
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

      // Update the last line
      let lastLine = lines[lines.length - 1];
      lastLine.points = lastLine.points.concat([
        transformedPos.x,
        transformedPos.y,
      ]);
      lines.splice(lines.length - 1, 1, lastLine);
      setLines(lines.concat());
    }
  };

  const handleMouseUp = () => {
    if (isPanning.current) {
      isPanning.current = false; // End panning
    } else if (isDrawing.current) {
      isDrawing.current = false; // End drawing
    }
    console.log(lines);
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
      console.log(lines.length);
      setRedo([...redo, lines[lines.length - 1]]);
      setLines((e) => e.slice(0, e.length - 1));
    }
  };
  // redo function
  const onRedo = (e) => {
    e.preventDefault();
    if (redo.length > 0) {
      setLines([...lines, redo[redo.length - 1]]);
      setRedo((e) => e.slice(0, e.length - 1));
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

      let lastLine = lines[lines.length - 1];
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
  };

  return (
    <>
      <div className="w-fit  border float-end relative">
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
            {lines.length === 0 && (
              <Text
                fontSize={isMobile ? 30 : 50}
                text="Just start drawing"
                x={isMobile ? -100 : -200}
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
            toggleSlider={toggleSlider}
            toggleTools={toggleTools}
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
      </div>
    </>
  );
}
// ? breakpoint 768px => md
export default Pc;
