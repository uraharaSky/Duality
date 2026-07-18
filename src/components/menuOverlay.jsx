import { Link } from "react-router-dom";
import "../styles/menu.css"

function MenuOverlay({ onClose }) {
    return (
        <div
            className="menu-overlay"
            data-cursor-theme="light"
        >

            <button
                className="close-toggle pixel-font"
                onClick={onClose}
                data-cursor="interactive"
            >
                [ CLOSE ]
            </button>

            <div className="overlay-header">
                Code by Akash
            </div>

            <div className="overlay-links">

                <div className="menu-item">
                    <div className="menu-item">
                        <Link
                            to="/about"
                            onClick={onClose}
                            data-cursor="interactive"
                        >
                            About Me
                        </Link>
                    </div>

                </div>
                <div className="separator"></div>

                <div
                    className="menu-item"
                    data-cursor="interactive"
                >
                    <a href="#products">Products</a>
                </div>
                <div className="separator"></div>

                <div
                    className="menu-item"
                    data-cursor="interactive"
                >
                    <a href="#projects">Projects</a>
                </div>
                <div className="separator"></div>

                <div
                    className="menu-item"
                    data-cursor="interactive"
                >
                    <a href="#blogs">Blogs</a>
                </div>
                <div className="separator"></div>

                <div
                    className="menu-item"
                    data-cursor="interactive"
                >
                    <a href="#contact">Contact</a>
                </div>

            </div>

        </div>

    );
}

export default MenuOverlay;