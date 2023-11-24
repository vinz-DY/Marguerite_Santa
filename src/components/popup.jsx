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
    }, 6000);

    return () => clearTimeout(timeoutId); // Nettoyer le timeout lorsque le composant est démonté.
  }, []);

  return (
    <div className="popupcontainer">
      {showPopup && (
        <div className="popup">
          <img src={Perestyle} alt="bla" />
          <p className="text2">
            Viens choper tes cadeaux sans te manger les cheminées !
          </p>
          <div className="textbutton">
            <p className="text">Consignes :</p>
            <p className="text">
              Flèche du haut ou Espace pour enchainer les jump ! Éclates le score !
            </p>
            <p className="text">
              Chaque cadeau dans ta hotte te rapporte 2 points
            </p>
            <p className="text">
              Si tu manges une cheminée, c'est GAME OVER !!
            </p>
          </div>
        </div>
      )}
      <button className="affichbutton" onClick={togglePopup}>
        Cliques ici tu verras ton Père
      </button>
    </div>
  );
};

export default Popup;
