import React, { useState, useEffect } from "react";
import "./Popup.css"; // Assurez-vous d'avoir un fichier de style (Popup.css) pour styliser votre pop-up.
import Perestyle from "../assets/Perestyle.png";

const Popup = () => {
  const [showPopup, setShowPopup] = useState(true);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  useEffect(() => {
    // Fermer la pop-up après un certain délai (par exemple, 3 secondes)
    const timeoutId = setTimeout(() => {
      setShowPopup(false);
    }, 1000000);

    return () => clearTimeout(timeoutId); // Nettoyer le timeout lorsque le composant est démonté.
  }, []);

  return (
    <div className="popupcontainer">
      {showPopup && (
        <div className="popup">
          <img src={Perestyle} alt="bla" />
          <p>
            Viens choper tes cadeaux sans te manger les cheminées !
            <br />
            Flèche du haut pour enchainer les jump! Eclates le score !
          </p>
        </div>
      )}
      <button className="affichbutton" onClick={togglePopup}>Afficher/ Masquer la Popup</button>
    </div>
  );
};

export default Popup;
