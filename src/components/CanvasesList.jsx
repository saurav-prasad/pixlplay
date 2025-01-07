import React, { memo, useEffect, useRef, useState } from "react";
import Item from "./Item";
import { BadgePlusIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { canvasRoute } from "../axios/axios";
import { addInAllCanvases, setAllCanvases } from "../app/features/allCanvases";
import sortArray from "../utils/sortArray";
import { faker } from "@faker-js/faker";
import createNewCanvas from "../utils/createNewCanvas";
import getAllCanvases from "../utils/getAllCanvases";
import throttling from "../utils/throttling";
import ItemSkeleton from "./ItemSkeleton";
import keyGenerator from "../utils/keyGenerator";
import genEmptyArr from "../utils/genEmptyArr";

function CanvasesList() {
  const [canvases, setCanvases] = useState([]);
  const dispatch = useDispatch();
  const { allCanvases } = useSelector((state) => state.allCanvasesReducer);
  const { user } = useSelector((state) => state.authReducer);
  const [isLoading, setIsLoading] = useState(genEmptyArr(5));

  // function to create a new canvas
  const handleNewCanvasClick = useRef(null);

  useEffect(() => {
    handleNewCanvasClick.current = throttling(async () => {
      setIsLoading(genEmptyArr(1));
      try {
        if (user) {
          const result = await createNewCanvas(user?.id);
          dispatch(addInAllCanvases(result));
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading([]);
      }
    }, 1500);
  }, [user]);

  useEffect(() => {
    async function fetchData() {
      if (user) {
        try {
          if (allCanvases) {
            const sortedArr = sortArray(allCanvases);
            setCanvases(sortedArr);
          } else {
            const response = await getAllCanvases();
            dispatch(setAllCanvases(response));
            setCanvases(response);
          }
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading([]);
        }
      }
    }
    fetchData();
  }, [allCanvases]);

  return (
    <>
      <div
        onClick={handleNewCanvasClick.current}
        className="select-none cursor-pointer flex transform items-center rounded-lg px-3 py-3 transition-colors duration-300 text-gray-900 bg-[#9e99bf85] hover:text-gray-950 justify-start space-x-2 text-lg shadow-[#3c3d591f] shadow-lg border-[#ffffff45] hover:bg-[#6872a6af] backdrop-blur-[100px] border-2 group"
      >
        <BadgePlusIcon
          className="transform group-hover:rotate-[360deg] group-hover:scale-125 duration-1000"
          aria-hidden="true"
        />
        <p className="text-md font-medium w-full truncate">New Canvas</p>
      </div>
      {isLoading.length > 0 && (
        <>
          {isLoading.map((_, index) => (
            <div className="flex rounded-lg transition-colors bg-[#9e99bf85] space-x-2 text-lg shadow-[#3c3d591f] shadow-lg border-[#ffffff45] backdrop-blur-[100px] border-2">
              <ItemSkeleton />
            </div>
          ))}
        </>
      )}{" "}
      {isLoading.length < 3 &&
        allCanvases &&
        canvases.map((item, index) => (
          <Item key={item._id} name={item?.name} id={item._id} />
        ))}
    </>
  );
}

export default memo(CanvasesList);
