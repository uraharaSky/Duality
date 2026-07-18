import {useEffect, useState} from "react";
import "../styles/home.css"
import JourneyRail from "../components/journeyRail";
import { Link } from "react-router-dom";

function Hero(){

    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {

        const handleScroll = () => {
            setScrolled(window.scrollY > 100);
        };

        window.addEventListener("scroll", handleScroll);

        return () =>
            window.removeEventListener("scroll", handleScroll);

    }, []);

    const greetings = [
        "bonjour",
        "hola",
        "こんにちは",
        "नमस्ते",
        "ନମସ୍କାର",
        "ciao",
        "안녕하세요",
        "hello"
    ];

    const [textIndex, setTextIndex] = useState(0);
    const [displayText, setDisplayText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);


    useEffect(() => {

        const currentWord = greetings[textIndex];

        const timeout = setTimeout(() => {

            if (!isDeleting) {

                setDisplayText(
                    currentWord.slice(0, displayText.length + 1)
                );

                if (displayText === currentWord) {

                    setTimeout(() => {
                        setIsDeleting(true);
                    }, 1200);

                }

            } else {

                setDisplayText(
                    currentWord.slice(0, displayText.length - 1)
                );

                if (displayText === "") {

                    setIsDeleting(false);

                    setTextIndex((prev) =>
                        (prev + 1) % greetings.length
                    );

                }

            }

        }, isDeleting ? 60 : 120);

        return () => clearTimeout(timeout);

    }, [displayText, isDeleting, textIndex]);

    return (
        <div className="main-container">

            {/* JOURNEY RAIL */}
            <JourneyRail />

            {/* LEFT SECTION */}
            <div className="left-section">


                {/* CONTENT */}
                <div className="content">

                    {/* LOGO */}
                    <div className="logo-container">

                        <img
                            src="/assets/icons/duality-logo.svg"
                            alt="Duality"
                            className={`duality-logo ${
                                scrolled ? "scrolled" : ""
                            }`}
                        />

                    </div>

                    {/* HERO */}
                    <div className="hero-section">

                        <h2 className="pixel-font typewriter greeting">
                            {displayText}
                        </h2>

                        <h2 className="pixel-font greeting">
                            I’m
                        </h2>

                        <h1 className="pixel-font title">
                            AKASH BISWAL
                        </h1>

                        <p className="description">
                            I build humane AI grounded in psychology and behavioral understanding.
                            Focused on creating systems that better understand people across finance and tech.
                        </p>

                        {/* BUTTONS */}
                        <div className="buttons">

                            <button
                                data-cursor="interactive"
                            >
                                → My Résumé
                            </button>

                            <button className="meow-button"
                                    data-cursor="interactive"
                            >
                                → Meow
                                <img
                                    src="/assets/icons/paw-icon.svg"
                                    alt="paw"
                                    className="paw-icon"
                                />
                            </button>

                        </div>

                    </div>

                </div>

            </div>

            {/* RIGHT SECTION */}
            <div className="right-section">


                {/* PORTAL TEXT */}
                <Link
                    to="/about"
                    className="portal-text pixel-font"
                    data-cursor="interactive"
                >
                    About me ↗
                </Link>

            </div>

        </div>
    )
}

export default Hero;