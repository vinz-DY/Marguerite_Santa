import React, { useState, useEffect } from "react";
import "./Popup.css"; // Assurez-vous d'avoir un fichier de style (Popup.css) pour styliser votre pop-up.
import Perestyle from "../assets/Perestyle.png";

const Popup = () => {
  const [showPopup, setShowPopup] = useState(true);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  }

  useEffect(() => {
    // Fermer la pop-up après un certain délai (par exemple, 3 secondes)
    const timeoutId = setTimeout(() => {
      setShowPopup(false);
    }, 10000);

    return () => clearTimeout(timeoutId); // Nettoyer le timeout lorsque le composant est démonté.
  }, []);

  return (
    <>
      {showPopup && (
          <div className="popup">
            <img src={Perestyle} alt="bla" />
            <p>Bienvenue sur notre site! Attraper vos cadeaux en évitant les cheminées, bonne chance !
            </p>
          </div>
      )}
       <button onClick={togglePopup}>Afficher/ Masquer la Popup</button>
    </>
  );
};

export default Popup;
