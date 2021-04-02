import { useState, useEffect } from 'react';


export default function useClickedOutside(node: HTMLElement, callback: Function) {
  const [clickedOutside, setClickedOutside] = useState(false);

  useEffect(() => {
    const handleClickOutside = (ev: any) => {
      if (!node) return;

      if (node.contains(ev.target)) {
        setClickedOutside(false);
      } else {
        setClickedOutside(true);

        if (callback) callback();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [node, callback]);

  return clickedOutside;
}
