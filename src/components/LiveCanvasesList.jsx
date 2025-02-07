import React, { memo, useEffect, useRef, useState } from "react";
import Item from "./Item";
import { useSelector } from "react-redux";
import ItemSkeleton from "./ItemSkeleton";
import genEmptyArr from "../utils/genEmptyArr";
import NotFoundTv from "./notFoundTv/NotFoundTv";

function LiveCanvasesList() {
  const [canvases, setCanvases] = useState([]);
  const { user } = useSelector((state) => state.authReducer);
  const [isLoading, setIsLoading] = useState(genEmptyArr(5));
  const { allLiveCanvases } = useSelector(
    (state) => state.allLiveCanvasesReducer
  );

  useEffect(() => {
    async function fetchData() {
      if (user) {
        try {
          setCanvases(allLiveCanvases);
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading([]);
        }
      }
    }
    fetchData();
  }, [user]);

  return (
    <>
      {isLoading.length > 0 && user && (
        <>
          {isLoading.map((_, index) => (
            <div
              key={index}
              className="flex rounded-lg transition-colors bg-[#9e99bf85] space-x-2 text-lg shadow-[#3c3d591f] shadow-lg border-[#ffffff45] backdrop-blur-[100px] border-2"
            >
              <ItemSkeleton />
            </div>
          ))}
        </>
      )}{" "}
      {isLoading.length < 3 && canvases.length > 0 && user ? (
        canvases.map((item, index) => (
          <Item
            key={item.canvasId}
            name={item?.canvasName}
            id={item.canvasId}
          />
        ))
      ) : (
        <div className="flex justify-center items-center flex-col gap-5">
          {/* <h1 className="text-center text-3xl text-gray-800 font-bold">
            Ooho!
          </h1> */}
          <h1 className="text-center text-3xl text-gray-800 font-bold font-rubik">
            No live Canvases Available!
          </h1>
          {/* <div className="border-b-2 shadow-2xl">
            <img className="w-80 object-contain" src={ChillDog} alt="" />
          </div> */}
          <NotFoundTv />
        </div>
      )}
    </>
  );
}

export default memo(LiveCanvasesList);
