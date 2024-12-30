import React from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Error() {
  const navigate = useNavigate();
  return (
    <div className="py-10 w-screen h-screen flex justify-center items-center">
      <div className="text-center">
        <p className="text-2xl font-semibold text-black">404</p>
        <h1 className="mt-2 text-5xl font-bold tracking-tight text-black">
          Page not found
        </h1>
        <p className="mt-4 text-lg font-medium leading-7 text-[#3E3A54]">
          Sorry, we couldn&apos;t find the page you&apos;re looking for.
        </p>
        <div className="mt-4 flex items-center justify-center gap-x-3">
          <button
            onClick={() => navigate("/")}
            type="button"
            className="inline-flex items-center rounded-md border-2 border-[#6872A6] px-3 py-2 text-sm font-semibold text-black shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black bg-[#9e99bf96] shadow-[#6e74a9] hover:bg-[#9e99bf] transition-all duration-300"
          >
            <ArrowLeft size={16} className="mr-2" />
            Go back
          </button>
        </div>
      </div>
    </div>
  );
}

export default Error;
