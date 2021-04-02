import { useRef, useEffect } from 'react';

export default function usePollingStrategy(miliseconds: number, pollingFunction: Function) {
  const timer: any = useRef();

  useEffect(
    function setTimer() {
      timer.current = setInterval(() => {
        pollingFunction();
      }, miliseconds);

      return () => clearInterval(timer.current);
    },
    [miliseconds, pollingFunction]
  );
}
