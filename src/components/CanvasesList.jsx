import React, { memo, useEffect, useRef, useState } from "react";
import Item from "./Item";
import { BadgePlusIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addInAllCanvases, setAllCanvases } from "../app/features/allCanvases";
import sortArray from "../utils/sortArray";
import createNewCanvas from "../utils/createNewCanvas";
import getAllCanvases from "../utils/getAllCanvases";
import throttling from "../utils/throttling";
import ItemSkeleton from "./ItemSkeleton";
import genEmptyArr from "../utils/genEmptyArr";
import Alert from "./Alert";
import { setAlert } from "../app/features/alert";
import Notfound from "../assets/images/falling_para.svg";
import AuthImg from "../assets/images/auth2.svg";

function CanvasesList() {
  const [canvases, setCanvases] = useState([]);
  const dispatch = useDispatch();
  const { allCanvases } = useSelector((state) => state.allCanvasesReducer);
  const { user } = useSelector((state) => state.authReducer);
  const [isLoading, setIsLoading] = useState(genEmptyArr(5));

  // function to create a new canvas
  const handleNewCanvasClick = useRef(null);

  const onNewCanvasClick = (e) => {
    setIsLoading(genEmptyArr(1));
    if (!user) {
      dispatch(setAlert({ type: "danger", text: "Please Sign in first..." }));
    } else {
      handleNewCanvasClick.current();
    }
  };

  useEffect(() => {
    handleNewCanvasClick.current = throttling(async () => {
      try {
        const result = await createNewCanvas(user?.id);
        dispatch(addInAllCanvases(result));
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
        onClick={onNewCanvasClick}
        className="select-none cursor-pointer flex transform items-center rounded-lg px-3 py-3 transition-colors duration-300 text-gray-900 bg-[#9e99bf85] hover:text-gray-950 justify-start space-x-2 text-lg shadow-[#3c3d591f] shadow-lg border-[#ffffff45] hover:bg-[#6872a6af] backdrop-blur-[100px] border-2 group"
      >
        <BadgePlusIcon
          className="transform group-hover:rotate-[360deg] group-hover:scale-125 duration-1000"
          aria-hidden="true"
        />
        <p className="text-md font-medium w-full truncate">New Canvas</p>
      </div>
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
      {isLoading.length < 3 && allCanvases && canvases.length > 0 ? (
        canvases.map((item, index) => (
          <Item key={item._id} name={item?.name} id={item._id} />
        ))
      ) : user ? (
        <>
          <h1 className="text-center !mt-4 text-3xl text-gray-800 font-bold font-barrio">
            No Canvases Available!
          </h1>
          <img src={Notfound} className="object-contain" alt="" />
        </>
      ) : (
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-center !mt-4 text-5xl text-gray-800 font-extrabold font-delius">
            Sign in first!
          </h1>
          <img src={AuthImg} className="object-contain max-h-[63vh]" alt="" />
        </div>
      )}
    </>
  );
}

export default memo(CanvasesList);
