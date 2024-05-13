import React, { useState, useEffect } from "react";
import './navbar.css'
import { GiMonkey } from "react-icons/gi";
import { IoIosCloseCircle } from "react-icons/io";
import { TbGridDots } from "react-icons/tb";

const Navbar = () => {
    const [active, setActive] = useState('navBar');
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        checkMetaMaskConnection();
    }, []);

    const checkMetaMaskConnection = async () => {
        const { ethereum } = window;
        const accounts = await ethereum.request({ method: 'eth_accounts' });
        setIsConnected(accounts && accounts.length > 0);
    }

    const showNav = () => {
        setActive('navBar activeNavbar');
    }

    const removeNav = () => {
        setActive('navBar');
    }

    const connectMetaMask = async () => {
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            console.log('Connected to MetaMask');
            checkMetaMaskConnection();
        } catch (error) {
            console.error('Error connecting to MetaMask:', error.message);
        }
    }

    return (
        <section className="navBarSection">
            <header className="header flex">
                <div className="logoDiv">
                    <a href="#" className="logo flex">
                        <h1><GiMonkey className="icon" /> monkeys</h1>
                    </a>
                </div>

                <div className={active}>
                    <ul className="navList flex">
                        <li className="navItem">
                            <a href="#" className="navLink">Home</a>
                        </li>
                        <li className="navItem">
                            <a href="#" className="navLink">Contacts</a>
                        </li>

                        <li className="navItem">
                            <a href="#" className="navLink">Collections</a>
                        </li>

                        <li className="navItem">
                            {isConnected ? (
                                <button className="btnGreen">
                                    Connected
                                </button>
                            ) : (
                                <button className="btnGo" onClick={connectMetaMask}>
                                    GO METAMASK
                                </button>
                            )}
                        </li>
                    </ul>

                    <div onClick={removeNav} className="closeNavbar">
                        <IoIosCloseCircle className="icon" />
                    </div>
                </div>

                <div onClick={showNav} className="toggleNavbar">
                    <TbGridDots className="icon" />
                </div>
            </header>
        </section>
    )
}

export default Navbar;
