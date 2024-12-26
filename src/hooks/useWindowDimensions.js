import { useState, useEffect } from "react";
import useDeviceType from "./useDeviceType";

const useWindowDimensions = () => {
  const isMobile = useDeviceType()
  const [dimensions, setDimensions] = useState({
    currWidth: window.innerWidth,
    currHeight: window.innerHeight,
    width: window.innerWidth > 768 ? window.innerWidth - 242 : window.innerWidth,
    height: window.innerWidth > 768 ? window.innerHeight - 61 : window.innerHeight - 103,
  });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        currWidth: window.innerWidth,
        currHeight: window.innerHeight,
        width: window.innerWidth > 768 ? window.innerWidth - 242 : window.innerWidth,
        height: window.innerWidth > 768 ? window.innerHeight - 61 : window.innerHeight - 103,
      });
    };

    // Attach resize event listener
    window.addEventListener("resize", handleResize);

    // Cleanup listener on component unmount
    return () => window.removeEventListener("resize", handleResize);

  }, []);

  return dimensions;
};

export default useWindowDimensions;
