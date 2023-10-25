import { useState, useEffect } from "react";
import { BURGER_BREAKPOINT } from "../config/config";

export function useLocalStorage(key, initialValue) {
  const storedValue = localStorage.getItem(key);
  let parsedValue;
  try {
    parsedValue = JSON.parse(storedValue);
  } catch (error) {
    parsedValue = storedValue;
  }

  const [value, setValue] = useState(parsedValue || initialValue);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

export const useMobileDetector = (breakpoint = BURGER_BREAKPOINT) => {
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
