import { TimeoutId } from "types/shared.types";

export function throttle(func: (...args: any) => void, delay: number) {
  let lastCall: number = 0;
  let timerId: TimeoutId | null = null;

  return function (...args: any[]) {
    const now = new Date().getTime();
    if (now - delay < lastCall) {
      timerId && clearTimeout(timerId);
      timerId = setTimeout(() => {
        lastCall = new Date().getTime();
        func(...args); // this will help to get last state for example when user scrolls very fast
      }, delay);
      return;
    }

    lastCall = new Date().getTime();
    timerId && clearTimeout(timerId);
    func(...args);
  };
}
