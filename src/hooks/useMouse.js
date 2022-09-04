import { useEffect, useState } from "react";

const useMouse = () => {
  // state
  const [mousePos, setMousePos] = useState({x: 0, y: 0});

  // get current mouse pos
  const getMousePos = e => {
    return {x: e.clientX, y: e.clientY};
  }

  // change state accordingly
  useEffect(() => {
    document.addEventListener('mousemove', e => setMousePos(getMousePos(e)))

    // cleanup
    return () => {
      document.removeEventListener('mousemove', e => setMousePos(getMousePos(e)))
    }
  });

  return mousePos;
}

export default useMouse;