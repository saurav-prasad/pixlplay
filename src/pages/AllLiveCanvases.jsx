import React, { lazy, Suspense } from "react";
import Loader from "../components/Loader";

const LiveCanvasesList = lazy(() => import("../components/LiveCanvasesList"));
function AllLiveCanvases() {
  return (
    <>
      <div className="flex-1 space-y-2 px-2 pt-24 pb-2 scroll-smooth max-w-3xl mx-auto">
        <h1 className="underline text-center text-4xl font-bold text-[#3d3850] mb-6 select-none">
          All Live Canvases
        </h1>
        <Suspense fallback={<Loader />}>
          <LiveCanvasesList />
        </Suspense>
      </div>
    </>
  );
}

export default AllLiveCanvases;
