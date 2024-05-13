import React, { useState, useEffect } from "react";
import "./home.css";
import contractAbiJson from "./contractAbi.json";
import video from "../../assets/mainvideo.mp4";
import Aos from "aos";
import "aos/dist/aos.css";
import { IoIosCloseCircle } from "react-icons/io";
import { FaExclamationCircle } from "react-icons/fa";
import Web3 from "web3";
import MissingMetaMaskPopup from "./missingMetaMask/missingMetamaskPopUp";

const Home = () => {
 const [isMintPopupOpen, setMintPopupOpen] = useState(false);
 const [inputContractAddress, setInputContractAddress] = useState("");
 const [inputTokenId, setInputTokenId] = useState("");
 const [inputToAddress, setInputToAddress] = useState("");
 const [isSuccessPopupOpen, setSuccessPopupOpen] = useState(false);
 const [isSubmitting, setSubmitting] = useState(false);
 const [isMissingMetaMaskPopupOpen, setMissingMetaMaskPopupOpen] = useState(false);

 const openMintPopup = () => {
    setMintPopupOpen(true);
 };

 const closeMintPopup = () => {
    setMintPopupOpen(false);
 };

 const openSuccessPopup = () => {
  setSuccessPopupOpen(true);
};

const closeSuccessPopup = () => {
  setSuccessPopupOpen(false);
};

 const handleInputContractAddressChange = (e) => {
    setInputContractAddress(e.target.value);
 };

 const handleInputTokenIdChange = (e) => {
    const nilaiTrimmed = e.target.value.trim();
    setInputTokenId(nilaiTrimmed);
 };

 const handleInputToAddressChange = (e) => {
    const nilaiTrimmed = e.target.value.trim();
    setInputToAddress(nilaiTrimmed);
 };

 const handleSubmit = async () => {
    try {
      const { ethereum } = window;
      const accounts = await ethereum.request({ method: 'eth_accounts' });

      if (!accounts || accounts.length === 0) {
        setMissingMetaMaskPopupOpen(true);
        return;
      }

      const web3 = new Web3(ethereum);
      const contractABI = contractAbiJson;

      const contractAddress = inputContractAddress;
      const contract = new web3.eth.Contract(contractABI, contractAddress);

      const toAddress = inputToAddress.startsWith("0x") ? inputToAddress : `0x${inputToAddress}`;

      if (toAddress.length !== 42 || !web3.utils.isAddress(toAddress)) {
        throw new Error("Alamat yang dimasukkan tidak valid.");
      }

      // Disable the mint popup before starting the transaction
      setMintPopupOpen(false);
      setSubmitting(true);

      await contract.methods.safeMint(toAddress, inputTokenId).send({ from: accounts[0] });

      openSuccessPopup();
    } catch (error) {
      console.error("Error minting:", error.message);
    } finally {
      setSubmitting(false);
    }
 };

 useEffect(() => {
 Aos.init({ duration: 2000 });

 if (typeof window.ethereum !== 'undefined') {
      console.log('Ethereum user detected. You should consider asking them if they would like to use MetaMask.');
 } else {
      console.log('No Ethereum provider detected.');
 }

 if (window.ethereum.isMetaMask) {
      console.log('User is using MetaMask.');
 } else {
      console.log('User is not using MetaMask.');
 }
}, []);

 return (
    <section className="home">
      <div className="overlay"></div>
      <video src={video} muted autoPlay loop type="video/mp4"></video>

      <div className="homeContent container">
        <div className="textDiv">
          <span data-aos="fade-up" className="smallText">
            Our Monkeys
          </span>

          <h1 data-aos="fade-up" className="homeTitle">
            Discover Exclusive Monkey NFTs
          </h1>

          <button data-aos="fade-up" className="btnMint" onClick={openMintPopup}>
            Mint NFT
          </button>

          {isMintPopupOpen && (
            <div data-aos="fade-down" data-aos-duration="500" className="popupContainer">
              <div className="mintPopup">
                <div className="popupHeader">
                 <h2>Mint NFT</h2>
                 <button onClick={closeMintPopup}><IoIosCloseCircle className="icon" /></button>
                </div>
                <div className="popupContent">
                 <p><FaExclamationCircle /> Please enter the your address that has been deployed on your smart contract and mint NFT here!</p>
                 <div className="inputGroup">
                      <input
                        type="text"
                        id="contractAddress"
                        value={inputContractAddress}
                        onChange={handleInputContractAddressChange}
                        placeholder="Enter the contract address"
                      />
                    </div>
                    <div className="inputGroup">
                      <input
                        type="text"
                        id="tokenId"
                        value={inputTokenId}
                        onChange={handleInputTokenIdChange}
                        placeholder="Token ID"
                      />
                    </div>
                    <div className="inputGroup">
                      <input
                        type="text"
                        id="toAddress"
                        value={inputToAddress}
                        onChange={handleInputToAddressChange}
                        placeholder="Enter recipient's Ethereum address"
                      />
                    </div>
                 <div className="buttonGroup">
                    <button className="cancelButton" onClick={closeMintPopup}>
                      Cancel
                    </button>
                    <button className="submitButton" onClick={handleSubmit} disabled={isSubmitting}>
                      {isSubmitting ? "Submitting..." : "Submit"}
                    </button>
                 </div>
                </div>
              </div>
            </div>
          )}

          {isSuccessPopupOpen && (
                    <div className="successPopup" data-aos="fade-left" data-aos-duration="500">
                      <div className="popupHeader">
                        <h2>Minting Successful!</h2>
                        <button onClick={closeSuccessPopup}><IoIosCloseCircle className="icon" /></button>
                      </div>
                      <div className="popupContent">
                        <p>Your NFT has been successfully minted!</p>
                      </div>
                    </div>
                  )}

          {isMissingMetaMaskPopupOpen && (
              <MissingMetaMaskPopup onClose={() => setMissingMetaMaskPopupOpen(false)} />
          )}
        </div>

        <div data-aos="fade-up" className="contentDescription">
          <p></p>
        </div>
      </div>
    </section>
 );
};

export default Home;
