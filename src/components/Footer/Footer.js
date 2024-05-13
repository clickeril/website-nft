import React, {useEffect} from "react";
import './footer.css'
import video2 from'../../assets/video2.mp4'

import Aos from 'aos'
import 'aos/dist/aos.css'

import { FiSend } from "react-icons/fi";
import { GiMonkey } from "react-icons/gi";
import { AiFillInstagram } from "react-icons/ai";
import { FaYoutube } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaDiscord } from "react-icons/fa";
import { FiChevronRight } from "react-icons/fi";

const Footer = () => {
    useEffect(()=>{
        Aos.init({duration: 2000})
    }, [])

    return(
        <section className="footer">
            <div className="videoDiv">
                <video src={video2} loop autoPlay muted type="video.mp4"></video>
            </div>

            <div className="secContent container">
                <div className="contactDiv flex">
                    <div data-aos="fade-up" className="text">
                        <small>KEEP IN TOUCH</small>
                        <h2>NFT collections with us</h2>
                    </div>

                    <div className="inputDiv flex">
                        <input data-aos="fade-up" type="text" placeholder="Enter Email Address"/>
                        <button data-aos="fade-up" className="btn flex" type="submit">
                            SEND <FiSend className="icon"/>
                        </button>
                    </div>
                </div>

                <div className="footerCard flex">
                    <div className="footerIntro flex">
                        <div className="logoDiv">
                            <a href="#" className="logo flex">
                                <GiMonkey className="icon"/>monkeys
                            </a>
                        </div>

                        <div data-aos="fade-up" className="footParagraph">
                            Explore our exclusive collection of monkey-inspired NFTs. Dive into the world of digital art, discover unique characters, and join a vibrant community of artists. Celebrate creativity with us!
                    </div>

                        <div data-aos="fade-up" className="footerSocials flex">
                            <AiFillInstagram className="icon"/>
                            <FaYoutube className="icon"/>
                            <FaSquareXTwitter className="icon"/>
                            <FaDiscord className="icon"/>
                        </div>
                    </div>

                    <div className="footerLinks grid">

                    {/* Group One */}
                    <div data-aos="fade-up" data-aos-duration="3000" className="linkGroup"> 
                            <span className="groupTitle">
                                DISCOVER
                            </span>

                            <li className="footerList flex">
                                <FiChevronRight className="icon"/>
                                Featured NFTs
                            </li>

                            <li className="footerList flex">
                                <FiChevronRight className="icon"/>
                                Collections
                            </li>

                            <li className="footerList flex">
                                <FiChevronRight className="icon"/>
                                Artists
                            </li>

                            <li className="footerList flex">
                                <FiChevronRight className="icon"/>
                                Trending
                            </li>

                            <li className="footerList flex">
                                <FiChevronRight className="icon"/>
                                Explore
                            </li>
                        </div>

                    {/* Group Two */}
                    <div data-aos="fade-up" data-aos-duration="4000" className="linkGroup"> 
                            <span className="groupTitle">
                                PARTNERSHIPS
                            </span>

                            <li className="footerList flex">
                                <FiChevronRight className="icon"/>
                                Collaborations
                            </li>

                            <li className="footerList flex">
                                <FiChevronRight className="icon"/>
                                Artists Network
                            </li>

                            <li className="footerList flex">
                                <FiChevronRight className="icon"/>
                                Affiliates
                            </li>

                            <li className="footerList flex">
                                <FiChevronRight className="icon"/>
                                Creators Program
                            </li>

                            <li className="footerList flex">
                                <FiChevronRight className="icon"/>
                                Submit Your NFT
                            </li>
                        </div>                        

                    {/* Group Three */}
                    <div data-aos="fade-up" data-aos-duration="5000" className="linkGroup"> 
                            <span className="groupTitle">
                                CATEGORIES
                            </span>

                            <li className="footerList flex">
                                <FiChevronRight className="icon"/>
                                Digital Art
                            </li>

                            <li className="footerList flex">
                                <FiChevronRight className="icon"/>
                                Collectibles
                            </li>

                            <li className="footerList flex">
                                <FiChevronRight className="icon"/>
                                Music NFTs
                            </li>

                            <li className="footerList flex">
                                <FiChevronRight className="icon"/>
                                Virtual Real Estate
                            </li>

                            <li className="footerList flex">
                                <FiChevronRight className="icon"/>
                                Gaming & Metaverse
                            </li>
                        </div>

                    </div>

                    <div className="footerDiv flex">
                        <small>Best NFT Collection Monkeys</small>
                        <small>COPYRIGHTS RESERVED - SYAHRIL 2024</small>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Footer