import {  useEffect, useRef } from "react";

const useModalClick = <T extends HTMLElement>(
  onClick: () => void,
  listenCapturing: boolean = true
) => {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    function clickOutsideTheModal(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) onClick();
    }
    document.addEventListener("click", clickOutsideTheModal, listenCapturing);

    return () => {
      document.removeEventListener(
        "click",
        clickOutsideTheModal,
        listenCapturing
      );
    };
  }, [onClick, listenCapturing]);

  return { ref };
};

export default useModalClick;
