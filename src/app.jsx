import { useEffect, useState } from "react";
import "./styles/global.css";

function App() {

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

            {/* LEFT SECTION */}
            <div className="left-section">

                {/* BACKGROUND PANELS */}
                <div className="panels">

                    <div className="panel"></div>
                    <div className="panel"></div>
                    <div className="panel"></div>
                    <div className="panel"></div>
                    <div className="panel"></div>

                </div>

                {/* CONTENT */}
                <div className="content">

                    {/* LOGO */}
                    <div className="logo-container">

                        <div className="logo-blobs">
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>

                        <h1 className="logo pixel-font">
                            Duality
                        </h1>

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
                            I build systems that think,
                            adapt, and understand people.
                        </p>

                        {/* BUTTONS */}
                        <div className="buttons">

                            <button>
                                → My Résumé
                            </button>

                            <button>
                                → Explore
                            </button>

                        </div>

                    </div>

                </div>

            </div>

            {/* RIGHT SECTION */}
            <div className="right-section">

                {/* MENU BUTTON */}
                <div className="menu-button">

                    <div></div>
                    <div></div>

                </div>

                {/* CENTER TEXT */}
                <div className="portal-text pixel-font">
                    About me ↗
                </div>

            </div>

        </div>

    );
}

export default App;