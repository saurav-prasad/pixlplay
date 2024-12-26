import {
  Blend,
  FlipHorizontal2,
  Highlighter,
  Pen,
  Smartphone,
  SquareStack,
} from "lucide-react";
import React from "react";
import { Zoom } from "react-awesome-reveal";

function Tools({ isToolsVisible, toggleTools, setTool, tool }) {
  const toolList = [
    {
      name: "Pen",
      icon: <Pen className="h-5 w-5 text-gray-900" />,
      toolName: "source-over",
    },
    {
      name: "Color Invert",
      icon: <FlipHorizontal2 className="h-5 w-5 text-gray-900" />,
      toolName: "xor",
    },
    {
      name: "Lighter",
      icon: <Highlighter className="h-5 w-5 text-gray-900" />,
      toolName: "lighter",
    },
    {
      name: "Multiply",
      icon: <SquareStack className="h-5 w-5 text-gray-900" />,
      toolName: "multiply",
    },
    {
      name: "Screen",
      icon: <Smartphone className="h-5 w-5 text-gray-900" />,
      toolName: "screen",
    },
    {
      name: "Overlay",
      icon: <Blend className="h-5 w-5 text-gray-900" />,
      toolName: "overlay",
    },
  ];
  return (
    <>
      {/* <Zoom duration={200}> */}
      <div
        className={`${
          isToolsVisible ? "translate-y-0" : "hidden"
        } absolute rounded-lg bottom-16 w-max left-[40%] border-2 px-1 py-2 transition-all duration-1000 bg-[#f3f4f6f7]`}
      >
        <button onClick={toggleTools} className="float-right mb-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-x"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>
        <div className="gap-2 max-h-96 overflow-auto w-full flex flex-col">
          {toolList.map((e, index) => (
            <List
              key={index}
              name={e.name}
              icon={e.icon}
              toolName={e.toolName}
              tool={tool}
              setTool={setTool}
            />
          ))}
        </div>
      </div>
      {/* </Zoom> */}
    </>
  );
}

export default Tools;

function List({ name, icon, setTool, toolName, tool }) {
  const onClick = () => {
    setTool({ name: toolName, component: icon });
  };

  return (
    <div
      onClick={onClick}
      className={`${
        toolName == tool.name && "bg-slate-200"
      } px-1 w-full rounded-md flex justify-start items-center gap-2 hover:bg-slate-200 transition-all cursor-pointer`}
    >
      <div
        title="Eraser"
        className="flex items-center space-x-2 cursor-pointer relative p-2 rounded-full w-fit h-fit border hover:bg-gray-200"
      >
        {icon}
      </div>
      <div className="flex-1 font-medium dark:text-gray-900 flex justify-start items-center">
        <div className="select-none">{name}</div>
        {/* <div className="ml-2 text-sm text-gray-600 dark:text-gray-600">
          {email}
        </div> */}
      </div>
    </div>
  );
}
