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
<<<<<<< HEAD
      setTimeout(function () {
        santaRef.current.classList.remove("jump");
      }, 1000);
    }
  };

  const addObstacle = () => {
    const isCactus = Math.random() < 0.5; // 50% chance of being a cactus
    const left = window.innerWidth; // Initial position

    const newObstacle = {
      id: new Date().getTime(),
      type: isCactus ? "cactus" : "gift",
      animationDuration: Math.random() * 3 + 3,
      left: left,
    };

    setCacti((prevObstacles) => [...prevObstacles, newObstacle]);
  };

 useEffect(() => {
  const isAlive = setInterval(() => {
    // obtenir la position Y actuelle de Santa
    const santaTop = parseInt(
      getComputedStyle(santaRef.current).getPropertyValue("top")
    );

    // détecter la collision
    for (const obstacle of cacti) {
      const obstacleLeft = obstacle.left || 0;
      const obstacleType = obstacle.type;

      if (
        obstacleType === "cactus" &&
        obstacleLeft < 40 &&
        obstacleLeft > 0 &&
        santaTop + 50 >= 155 &&
        santaTop <= 195
      ) {
        // collision avec le cactus
        alert("Game Over! Your Score : " + score);
        setScore(0);
        setCacti([]); // Réinitialiser la liste des obstacles
      } else if (
        obstacleType === "gift" &&
        obstacleLeft < 40 &&
        obstacleLeft > 0 &&
        santaTop + 50 >= 180 &&
        santaTop <= 200
      ) {
        // collision avec le cadeau
        // Augmenter le score et retirer le cadeau
        setScore((prevScore) => prevScore + 10);
        setCacti((prevObstacles) =>
          prevObstacles.filter((o) => o.id !== obstacle.id)
        );
      }
    }

    // Déplacer les obstacles
    setCacti((prevObstacles) =>
      prevObstacles.map((obstacle) => ({
        ...obstacle,
        left: obstacle.left - 2,
      }))
    );

    // Ajouter un nouvel obstacle
    if (Math.random() < 0.02) {
      addObstacle();
    }
  }, 10);

  return () => clearInterval(isAlive);
}, [cacti, score]);

=======
      setIsJumping(true); // Activer l'état de saut
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
>>>>>>> b18fedcc39c2930e1779dafedf90d7ef5b8a0a0c

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
<<<<<<< HEAD
      <div id="santa" ref={santaRef}></div>
=======
      <div
        id="santa"
        ref={santaRef}
        className={isJumping ? "jump" : ""} // Ajouter la classe de saut si l'état de saut est activé
      ></div>
>>>>>>> b18fedcc39c2930e1779dafedf90d7ef5b8a0a0c
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