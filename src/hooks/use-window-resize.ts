import { useCallback, useEffect } from "react";
import { RESIZE_WAITING_TIME } from "constants/shared.constants";
import { throttle } from "helpers/throttle";

export const useWindowResize = (callBack: VoidFunction, delay: number = RESIZE_WAITING_TIME) => {
  const throttledCallBack = useCallback(
    throttle(() => callBack(), delay),
    [callBack]
  );

  useEffect(() => {
    window.addEventListener("resize", throttledCallBack);

    return () => window.removeEventListener("resize", throttledCallBack);
  });
};
