import "../styles/about.css";
import { useNavigate } from "react-router-dom";

// Animations for Cards
import BuildCardAnimation from "../animations/buildCardAnimation";
export default function About() {

    const navigate = useNavigate();

    return (

        <div className="about-page">

            {/* TOP BAR */}

            <div className="about-topbar">

                <div className="about-header">
                    Code by Akash
                </div>

                <button
                    className="close-toggle close-toggle-light pixel-font"
                    onClick={() => navigate("/")}
                >
                    [ CLOSE ]
                </button>
                
            </div>

            <div className="about-content">

                {/*{About Me}*/}

                <section className="about-intro">

                    <h1 className="about-title pixel-font">
                        About Me
                    </h1>

                    <p className="about-copy">

                        I spend most of my time thinking about how people make decisions.

                        <br /><br />

                        Sometimes that means building AI.
                        Sometimes it means studying behavior.
                        Sometimes it means questioning why we buy things,
                        trust systems, or change our minds.

                        <br /><br />

                        I am interested in the space where psychology,
                        technology, and human judgment meet.

                    </p>

                </section>

                {/*{My Philosophy}*/}

                <section className="philosophy-section">

                    <h2 className="section-heading-pixel-font">
                        My Philosophy
                    </h2>

                    <div className="philosophy-grid">

                        <div className="philosphy-card">
                            <div className="card-visual">
                                <BuildCardAnimation />
                            </div>
                            <h3 className="card-pixel-font">Build</h3>
                            <p className="card-description">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            </p>
                        </div>

                        <div className="philosphy-card">
                            <div className="card-visual"></div>
                            <h3 className="card-pixel-font">Simulate</h3>
                            <p className="card-description">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            </p>
                        </div>

                        <div className="philosphy-card">
                            <div className="card-visual"></div>
                            <h3 className="card-pixel-font">Reflect</h3>
                            <p className="card-description">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            </p>
                        </div>

                        <div className="philosphy-card">
                            <div className="card-visual"></div>
                            <h3 className="card-pixel-font">Connect</h3>
                            <p className="card-description">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            </p>
                        </div>

                    </div>

                </section>

                {/*{Searching section}*/}

                <section className="Searching-section">

                    <h2 className="section-heading pixel-font">
                        What I am searching for?
                    </h2>

                </section>

                {/*{Footnotes}*/}

                <section className="footnotes-section">

                    <h2 className="section-heading pixel-font">
                        My Footnotes
                    </h2>

                </section>

                {/*{Final section}*/}

                <section className="final-section">

                    <h2 className="section-heading pixel-font">
                        If you're still reading ...
                    </h2>

                </section>

            </div>



        </div>

    );
}