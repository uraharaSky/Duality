import { useEffect, useState } from "react";
import JourneyRail from "./components/JourneyRail";
import "./styles/global.css";

function App() {

    const [menuOpen, setMenuOpen] = useState(false);

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

                {/* BACKGROUND PANELS */}
                <div className="panels">

                    {Array.from({ length: 8 }).map((_, i) => (
                        <div className="panel" key={i}></div>
                    ))}

                </div>

                {/* CONTENT */}
                <div className="content">

                    {/* LOGO */}
                    <div className="logo-container">

                        <img
                            src="/assets/icons/duality-logo.svg"
                            alt="Duality"
                            className="duality-logo"
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

                            <button>
                                → My Résumé
                            </button>

                            <button className="meow-button">
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

                {/* MENU BUTTON */}
                <button
                    className="menu-toggle pixel-font"
                    onClick={() => setMenuOpen(true)}
                >
                    [ MENU ]
                </button>

                {/* PORTAL TEXT */}
                <div className="portal-text pixel-font">
                    About me ↗
                </div>

            </div>
            {menuOpen && (

                <div className="menu-overlay">

                    <button
                        className="close-toggle pixel-font"
                        onClick={() => setMenuOpen(false)}
                    >
                        [ CLOSE ]
                    </button>

                    <div className="overlay-header">
                        Code by Akash
                    </div>

                    <div className="overlay-links">

                        <div className="menu-item">
                            <a href="#about">About Me</a>

                        </div>
                        <div className="separator"></div>

                        <div className="menu-item">
                            <a href="#products">Products</a>
                        </div>
                        <div className="separator"></div>

                        <div className="menu-item">
                            <a href="#projects">Projects</a>
                        </div>
                        <div className="separator"></div>

                        <div className="menu-item">
                            <a href="#blogs">Blogs</a>
                        </div>
                        <div className="separator"></div>

                        <div className="menu-item">
                            <a href="#contact">Contact</a>
                        </div>

                    </div>

                </div>
            )}

        </div>

    );
}

export default App;