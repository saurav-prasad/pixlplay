import { useState, useEffect } from "react";
import useDeviceType from "./useDeviceType";

const useWindowDimensions = () => {
  const isMobile = useDeviceType()
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth - 242,
    height: window.innerHeight - 61,
  });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth - 242,
        height: window.innerHeight - 61,
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
