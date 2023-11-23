import React, { useEffect, useRef, useState } from "react";
import "./santa.css";

function Santa() {
  const santaRef = useRef();
  const [cacti, setCacti] = useState([]);
  const [score, setScore] = useState(0);
  
  const [isJumping, setIsJumping] = useState(false);

  const jump = () => {
    if (!!santaRef.current && !santaRef.current.classList.contains("jump")) {
      santaRef.current.classList.add("jump");
      setIsJumping(true); // Activer l'état de saut

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

  const endJump = () => {
    setIsJumping(false); // Désactiver l'état de saut
  };

  const addObstacle = () => {
    const isCactus = Math.random() < 0.5; // 50% chance of being a cactus
    const left = window.innerWidth; // Initial position

    const newObstacle = {
      id: new Date().getTime(),
      type: isCactus ? "cactus" : "gift",
      animationDuration: Math.random() * 2 + 2,
      left: left,
    };

    setCacti((prevObstacles) => [...prevObstacles, newObstacle]);
  };

  useEffect(() => {
    const isAlive = setInterval(() => {
      // get current santa Y position
      const santaRect = santaRef.current.getBoundingClientRect();

      // Move obstacles
      setCacti((prevObstacles) =>
        prevObstacles.map((obstacle) => ({
          ...obstacle,
          left: obstacle.left - 2,
        }))
      );

      // detect collision
      setCacti((prevObstacles) => {
        const newObstacles = [...prevObstacles];

        for (let i = 0; i < newObstacles.length; i++) {
          const obstacle = newObstacles[i];
          const obstacleRect = obstacle.ref.getBoundingClientRect();

          if (
            santaRect.left +10 < obstacleRect.right &&
            santaRect.right - 10 > obstacleRect.left &&
            santaRect.top + 10 < obstacleRect.bottom &&
            santaRect.bottom - 10 > obstacleRect.top
          ) {
            // Collision détectée
            if (obstacle.type === "cactus") {
              // Collision avec un cactus
              alert("Game Over! Your Score : " + score);
              setScore(0);
              return []; // Réinitialiser la liste des obstacles
            } else if (obstacle.type === "gift") {
              // Collision avec un cadeau
              setScore((prevScore) => prevScore + 1);
              // Supprimer le cadeau du tableau
              newObstacles.splice(i, 1);
            }
          }
        }

        // Ajouter un nouvel obstacle
        if (Math.random() < 0.005) {
          addObstacle();
        }

        return newObstacles;
      });
    }, 10);

    return () => clearInterval(isAlive);
  }, [isJumping, score]);

  useEffect(() => {
    document.addEventListener("keydown", jump);
    document.addEventListener("keyup", endJump);
    return () => {
      document.removeEventListener("keydown", jump);
      document.removeEventListener("keyup", endJump);
    };
  }, []);

  useEffect(() => {
    addObstacle();
  }, []); // Ajouter un obstacle au démarrage

  return (
    <div className="game">
      Score : {score}
      <div
        id="santa"
        ref={santaRef}
        className={isJumping ? "jump" : ""} // Ajouter la classe de saut si l'état de saut est activé
      ></div>
      {cacti.map((obstacle) => (
        <div
          key={obstacle.id}
          className={obstacle.type}
          ref={(ref) => (obstacle.ref = ref)}
          style={{
            left: obstacle.left || 0, // Utilisez 0 si obstacle.left n'est pas défini
            animation: `move ${obstacle.animationDuration}s infinite linear`,
          }}
        ></div>
      ))}
    </div>
  );
}

export default Santa;
