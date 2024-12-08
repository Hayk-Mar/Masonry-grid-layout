import { MutableRefObject, useEffect, useRef } from "react";

type Props = {
  observableElementRef: MutableRefObject<HTMLElement | null>;
  startObserving: boolean;
  callBack: VoidFunction;
};

export const useObserveElement = ({ observableElementRef, startObserving, callBack }: Props) => {
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const bufferHeight = window.innerHeight;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(
      (entries) => {
        entries.some((entry) => {
          if (entry.isIntersecting) {
            return callBack();
          }
        });
      },
      {
        root: document,
        threshold: 1,
        rootMargin: `${bufferHeight}px`,
      }
    );

    return () => {
      observer.current?.disconnect();
    };
  }, [callBack]);

  useEffect(() => {
    if (!observer.current || !observableElementRef.current) return;
    startObserving
      ? observer.current.observe(observableElementRef.current)
      : observer.current.unobserve(observableElementRef.current);
  }, [startObserving]);
};
