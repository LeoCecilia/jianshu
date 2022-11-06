import { useCallback, useEffect, useRef } from "react";

interface RefProps {
  fn: Function;
  timer: ReturnType<typeof setTimeout> | null;
}

export function useDebounce(fn: Function, delay: number, dep: Array<any> = []) {
  const { current } = useRef({ fn, timer: null } as RefProps);
  useEffect(() => {
    current.fn = fn;
  }, [fn, current]);

  return useCallback(
    function (...args) {
      if (current.timer) {
        clearTimeout(current.timer);
      }
      current.timer = setTimeout(() => {
        current.fn.call(this, ...args);
      }, delay);
    },
    [dep]
  );
}
