import React, { useEffect, useRef, useState } from "react";
import "./santa.css";

function Santa() {
  const santaRef = useRef();
  const cactusRef = useRef();
  const [score, setScore] = useState(0);

  const jump = () => {
    if (!!santaRef.current && santaRef.current.classList != "jump") {
      santaRef.current.classList.add("jump");
      setTimeout(function () {
        santaRef.current.classList.remove("jump");
      }, 300);
    }
  };

  useEffect(() => {
    const isAlive = setInterval(function () {
      // get current santa Y position
      const santaTop = parseInt(
        getComputedStyle(santaRef.current).getPropertyValue("top")
      );

      // get current cactus X position
      let cactusLeft = parseInt(
        getComputedStyle(cactusRef.current).getPropertyValue("left")
      );

      // detect collision
      if (cactusLeft < 30 && cactusLeft > 0 && santaTop >= 150) {
        // collision
        alert("Game Over! Your Score : " + score);
        setScore(0);
      } else {
        setScore(score + 1);
      }
    }, 10);

    return () => clearInterval(isAlive);
  });

  useEffect(() => {
    document.addEventListener("keydown", jump);
    return () => document.removeEventListener("keydown", jump);
  }, []);

  return (
    <div className="game">
      Score : {score}
      <div id="santa" ref={santaRef}></div>
      <div id="cactus" ref={cactusRef}></div>
    </div>
  );
}

export default Santa;
