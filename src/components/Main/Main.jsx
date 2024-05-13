import React, { useEffect, useState } from "react";
import './main.css';
import { Data } from './dataMonkey';
import { MdOutlineToken } from "react-icons/md";
import { RiNftLine } from "react-icons/ri";
import Aos from 'aos';
import 'aos/dist/aos.css';
import Web3 from 'web3';
import contractAbiJson from '../Home/contractAbi.json';

const Main = () => {
    const [selectedNFT, setSelectedNFT] = useState(null);

    useEffect(() => {
        Aos.init({ duration: 2000 });
    }, []);

// Fungsi handleSelectNFT
const handleSelectNFT = (nft) => {
    // Menyimpan hanya atribut yang diperlukan
    const selectedData = {
        id: nft.id,
        name: nft.name,
        description: nft.description,
        image: nft.image,
        attributes: Array.isArray(nft.attributes)
            ? nft.attributes.map(attr => `${attr.trait_type}: ${attr.value}`).join(', ')
            : '',
    };

    setSelectedNFT(selectedData);

    // Menampilkan selectedNFT pada console
    console.log('Selected NFT JSON:', JSON.stringify(selectedData));
};
const handleMint = async () => {
    if (selectedNFT) {
        try {
            const providerUrl = 'https://polygon-mumbai.g.alchemy.com/v2/TWT3ZKS6WS2o3Ch5mVqwKzvcEhdPyJXr';
            const web3 = new Web3(providerUrl);

            const contractAbi = contractAbiJson;
            const contractAddress = '0x9459ce479F2532f70262AA5353C0E8327AE0f490';
            const contract = new web3.eth.Contract(contractAbi, contractAddress);

            const receiverAddress = '0xecbD6510A5ed793841055ef38A84F4d87919454C'; // atur penerima

            const tokenURI = JSON.stringify(selectedNFT);

            const gasPrice = await web3.eth.getGasPrice();

            const tx = {
                from: '0x8bc9308f4fF2ad8090425dB654D62A079973185E',
                to: contractAddress,
                data: contract.methods.safeMint(receiverAddress, selectedNFT.id).encodeABI(),
                gas: 5000000,
                gasPrice: gasPrice,
            };

            console.log('Transaction details:', tx);

            const signedTx = await web3.eth.accounts.signTransaction(tx, '7359e553fcb7c313751c9224f7e9262ccfe92c81742ebe1bc4320db498894ead');

            const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

            await contract.methods.setTokenURI(selectedNFT.id, tokenURI).send({ from: '0x8bc9308f4fF2ad8090425dB654D62A079973185E' });

            console.log('NFT minted successfully:', receipt);
        } catch (error) {
            console.error('Error minting NFT:', error);

            console.error('Transaction details:', error.transaction);
            console.error('Reverted:', error.receipt);

            // Handle the error appropriately
            if (error.message.includes('revert')) {
                console.error('Transaction reverted. Possible reason: insufficient funds or incorrect parameters.');
            } else {
                console.error('An unexpected error occurred during contract execution.');
            }
        }
    }
};



    return (
        <section className="main container section">
            <div className="secTitle">
                <h3 data-aos="fade-right" className="title">
                    Most Monkeys NFT
                </h3>
            </div>

            <div className="secContent grid">
                {Data.map(({ id, studiosName, name, category, description, image, title, price }) => {
                    return (
                        <div key={id} data-aos="fade-up" className="singleNft" onClick={() => handleSelectNFT({ id, studiosName, name, category, description, image, title, price, attributes: [{ trait_type: 'Studios Name', value: studiosName }, { trait_type: 'Character', value: name }, { trait_type: 'Category', value: category }] })}>

                            <div className="imgDiv">
                                <img src={image} alt={title} />
                            </div>

                            <div className="cardInfo">
                                <h4 className="destTitle">
                                    {studiosName}
                                </h4>
                                <span className="continent flex">
                                    <MdOutlineToken className="icon" />
                                    <span className="name">{name}</span>
                                </span>

                                <div className="fees flex">
                                    <div className="grade">
                                        <span>{category} <small>+1</small></span>
                                    </div>
                                    <div className="price">
                                        <h5>{price}</h5>
                                    </div>
                                </div>

                                <div className="desc">
                                    <p>{description}</p>
                                </div>

                                <button className="btn flex" onClick={handleMint}>
                                    MINT NFT <RiNftLine className="icon" />
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}

export default Main;
