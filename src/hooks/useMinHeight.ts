import { MutableRefObject, RefObject, useEffect, useState } from "react";
import useWindowWidth from "./useWindowWidth";

// calculates and returns the smallest possible height of a section based on the passed elements and padding
const useMinHeight = (nodesRef: MutableRefObject<HTMLElement[]>, paddingNodeRef: RefObject<HTMLElement>): number => {
  const [height, setHeight] = useState(0);
  const windowWidth = useWindowWidth();

  useEffect(() => {
    if (!nodesRef.current.length || !paddingNodeRef.current) return;

    // gets computed styles and sets the padding using the padding node
    const paddingNodeComputedStyles = window.getComputedStyle(paddingNodeRef.current);
    const padding = parseInt(paddingNodeComputedStyles.paddingTop) + parseInt(paddingNodeComputedStyles.paddingBottom);

    // total height of all passed nodes(including padding node)
    const totalHeight = nodesRef.current
      .map((node) => {
        const computedStyles = window.getComputedStyle(node);
        return node.clientHeight + parseInt(computedStyles.marginTop) + parseInt(computedStyles.marginBottom);
      })
      .reduce((acc, cv) => acc + cv, padding);

    if (height !== totalHeight) {
      setHeight(totalHeight);
    }
  }, [windowWidth]);

  return height;
};

export default useMinHeight;
