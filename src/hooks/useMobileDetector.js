import { useState, useEffect } from "react";

const useMobileDetector = (breakpoint = 800) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= breakpoint);

  useEffect(() => {
    const updateMedia = () => {
      setIsMobile(window.innerWidth <= breakpoint);
    };

    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  }, [breakpoint]);

  return isMobile;
};

export default useMobileDetector;
