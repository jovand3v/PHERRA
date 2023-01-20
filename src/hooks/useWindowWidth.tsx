import { useEffect, useState } from "react";

// listens to resize, updates 500ms after resize stop, and returns the current window width
const useWindowWidth = (): number => {
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setWindowWidth(window.innerWidth);
      }, 500);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowWidth;
};

export default useWindowWidth;
