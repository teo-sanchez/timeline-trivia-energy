import { useCallback, useEffect, useState } from "react";

const useMouse = () => {
  // state
  const [mousePos, setMousePos] = useState({x: 0, y: 0});

  const updateMousePos = e => {
    setMousePos({x: e.clientX, y: e.clientY});
  };

  // change state accordingly
  useEffect(() => {
    document.addEventListener('mousemove', updateMousePos)

    // cleanup
    return () => {
      document.removeEventListener('mousemove', updateMousePos)
    }
  }, []);

  return mousePos;
}

export default useMouse;