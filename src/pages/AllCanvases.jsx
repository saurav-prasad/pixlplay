import React, { lazy, Suspense } from "react";

const CanvasesList = lazy(() => import("../components/CanvasesList"));
function AllCanvases() {
  return (
    <div className="flex-1 space-y-2 px-2 pt-24 pb-2 scroll-smooth max-w-3xl mx-auto">
      <h1 className="text-center text-4xl font-bold text-[#3d3850] mb-6">
        All Canvases
      </h1>
      <Suspense
        fallback={
          <h1 className="w-full text-center text-2xl font-medium text-gray-800">
            Loading...
          </h1>
        }
      >
        <CanvasesList />
      </Suspense>
    </div>
  );
}

export default AllCanvases;
