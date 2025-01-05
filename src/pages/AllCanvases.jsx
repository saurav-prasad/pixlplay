import React, { lazy, Suspense } from "react";
import  Loader  from "../components/Loader";

const CanvasesList = lazy(() => import("../components/CanvasesList"));
function AllCanvases() {
  return (
    <div className="flex-1 space-y-2 px-2 pt-24 pb-2 scroll-smooth max-w-3xl mx-auto">
      <h1 className="text-center text-4xl font-bold text-[#3d3850] mb-6 select-none">
        All Canvases
      </h1>
      <Suspense fallback={<Loader />}>
        <CanvasesList />
      </Suspense>
    </div>
  );
}

export default AllCanvases;
