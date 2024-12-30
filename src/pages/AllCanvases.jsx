import React from "react";
import CanvasesList from "../components/CanvasesList";

function AllCanvases() {
  return (
    <div className="flex-1 space-y-2 px-2 pt-28 md:pt-24 pb-2 scroll-smooth max-w-3xl mx-auto">
      <h1 className="text-center text-4xl font-bold text-[#3d3850] mb-5">
        All Canvases
      </h1>
      <CanvasesList />
    </div>
  );
}

export default AllCanvases;
