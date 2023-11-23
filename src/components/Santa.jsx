import React, { useEffect, useRef, useState } from "react";
import "./santa.css";

function Santa() {
  const santaRef = useRef();
  const cactusRef = useRef();
  const [score, setScore] = useState(0);
  const [isGamePaused, setGamePaused] = useState(false);

  const jump = () => {

    if (
      !isGamePaused &&
      !!dinoRef.current &&
      dinoRef.current.classList !== "jump"
    ) {
      dinoRef.current.classList.add("jump");
      setTimeout(() => {
        dinoRef.current.classList.remove("jump");

      }, 300);
    }
  };
  // POUR JUMPER ET METTRE EN PAUSE
  const handleKeyPress = (event) => {
    if (event.key === "ArrowUp") {
      jump();
    } else if (event.key === " ") {
      togglePause();
    }
  };

  const togglePause = () => {
    setGamePaused((prevIsGamePaused) => !prevIsGamePaused);
  };
  //
  useEffect(() => {
    const isAlive = setInterval(() => {
      if (!isGamePaused) {
        const dinoTop = parseInt(
          getComputedStyle(dinoRef.current).getPropertyValue("top")
        );
        let cactusLeft = parseInt(
          getComputedStyle(cactusRef.current).getPropertyValue("left")
        );

        if (cactusLeft < 40 && cactusLeft > 0 && dinoTop >= 140) {
          alert("Game Over! Your Score: " + score);
          setScore(0);
        } else {
          setScore((prevScore) => prevScore + 1);

          // Mettre à jour la position du cactus uniquement si le jeu n'est pas en pause
          if (!isGamePaused) {
            cactusRef.current.style.left = cactusLeft - 1 + "px";
          }
        }
      }
    }, 10);

    return () => {
      clearInterval(isAlive);
    };
  }, [isGamePaused, score]);

  useEffect(() => {
    const dino = dinoRef.current;
    const cactus = cactusRef.current;

    if (isGamePaused) {
      dino.style.animationPlayState = "paused";
      cactus.style.animationPlayState = "paused";
    } else {
      dino.style.animationPlayState = "running";
      cactus.style.animationPlayState = "running";
    }

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [isGamePaused]);

  return (
    <div className="game">
      <div>
        Score: {score} | {isGamePaused ? "Paused" : "Playing"}
      </div>
      <div id="dino" ref={dinoRef}></div>
      <div id="cactus" ref={cactusRef}></div>
    </div>
  );
}

export default Santa;
