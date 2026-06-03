import "../styles/about.css";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

// Animations for Cards
import BuildCardAnimation from "../animations/buildCardAnimation";
import SimulateCardAnimation from "../animations/simulateCardAnimation";
import ConnectCardAnimation from "../animations/connectCardAnimation";
import ReflectCardAnimation from "../animations/reflectCardAnimation";

export default function About() {

    const navigate = useNavigate();

    const searchLines = [
        "I'm not chasing a role or a title.",
        "I'm trying to build the kind of work that makes sense to me.",
        "I look for systems that make people curious, not just efficient.",
        "I want to work with teams that think deeply before moving fast.",
        "I'm not here to outwork everyone.",
        "I just want to understand what I'm building and why it matters."
    ];

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
                                I don’t just code to solve.
                                I build to reveal what’s missing in design, in empathy, in focus.
                                Every feature should feel like it always belonged.
                            </p>
                        </div>

                        <div className="philosphy-card">
                            <div className="card-visual">
                                <SimulateCardAnimation />
                            </div>
                            <h3 className="card-pixel-font">Simulate</h3>
                            <p className="card-description">
                                A graph isn’t just data, it’s  a whisper.
                                Behind every curve is a human story, a behavior asking to be understood.
                                I model with curiosity first, accuracy next.
                            </p>
                        </div>

                        <div className="philosphy-card">
                            <div className="card-visual">
                                <ReflectCardAnimation/>
                            </div>
                            <h3 className="card-pixel-font">Reflect</h3>
                            <p className="card-description">
                                Speed hides details .I believe clarity  comes when you let ideas breathe.
                                Even in deadlines, I pause  to question, to reframe, to align.
                            </p>
                        </div>

                        <div className="philosphy-card">
                            <div className="card-visual">
                                <ConnectCardAnimation />
                            </div>
                            <h3 className="card-pixel-font">Connect</h3>
                            <p className="card-description">
                                Software should speak less and listen more.
                                It should adapt, respond, and sometimes just wait.
                                That’s when people feel seen, not processed
                            </p>
                        </div>

                    </div>

                </section>

                {/*{Searching section}*/}

                <section className="Searching-section">

                    <h2 className="section-heading-pixel-font">
                        What I am searching for?
                    </h2>

                    <div className="search-block">

                        <motion.span
                            className="quote-mark-opening"
                            initial={{
                                opacity: 0,
                                scale: 0.8,
                                y: 10
                            }}
                            whileInView={{
                                opacity: 1,
                                scale: 1,
                                y: 0
                            }}
                            viewport={{ once: true }}
                            transition={{
                                duration: 0.5
                            }}
                        >
                            "
                        </motion.span>

                        <motion.div
                            className="quote-container"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                            variants={{
                                visible: {
                                    transition: {
                                        staggerChildren: 0.15
                                    }
                                }
                            }}
                        >
                            {searchLines.map((line, index) => (
                                <motion.p
                                    key={index}
                                    variants={{
                                        hidden: {
                                            opacity: 0,
                                            y: 20,
                                            filter: "blur(8px)"
                                        },
                                        visible: {
                                            opacity: 1,
                                            y: 0,
                                            filter: "blur(0px)"
                                        }
                                    }}
                                    transition={{
                                        duration: 0.7
                                    }}
                                >
                                    {line}
                                </motion.p>
                            ))}
                        </motion.div>

                        <motion.span
                            className="quote-mark-closing"
                            initial={{
                                opacity: 0,
                                scale: 0.8,
                                y: 10
                            }}
                            whileInView={{
                                opacity: 1,
                                scale: 1,
                                y: 0
                            }}
                            viewport={{ once: true }}
                            transition={{
                                duration: 0.5,
                                delay: 0.8
                            }}
                        >
                            "
                        </motion.span>
                    </div>

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