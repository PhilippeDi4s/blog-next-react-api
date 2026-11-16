import { useEffect } from "react";

let lockCount = 0;
let originalOverflow = "";

export function useLockBodyScroll() {
  useEffect(() => {
    if (lockCount === 0) {
      originalOverflow = document.body.style.overflow;
    }
    lockCount++;
    document.body.style.overflow = "hidden";

    return () => {
      lockCount--;
      if (lockCount === 0) {
        document.body.style.overflow = originalOverflow;
      }
    };
  }, []);
}
