import React from "react";
import { IoIosCloseCircle } from "react-icons/io";
import "./missingMetaMaskPopUp.css"

const MissingMetaMaskPopup = ({ onClose }) => {
  return (
    <div className="missingMetaMaskPopup" data-aos="fade-left" data-aos-duration="500" >
      <div className="popupHeader">
        <h2>MetaMask Connection</h2>
        <button onClick={onClose}><IoIosCloseCircle className="icon" /></button>
      </div>
      <div className="popupContent">
        <p>
          To mint an NFT, you need to connect to MetaMask. Please make sure you have MetaMask installed and connected to your Ethereum account.
        </p>
      </div>
    </div>
  );
};

export default MissingMetaMaskPopup;
