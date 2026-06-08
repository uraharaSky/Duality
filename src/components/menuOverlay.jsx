import { Link } from "react-router-dom";
import "../styles/menu.css"

function MenuOverlay({ onClose }) {
    return (
        <div className="menu-overlay">

            <button
                className="close-toggle pixel-font"
                onClick={onClose}
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
                        >
                            About Me
                        </Link>
                    </div>

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

    );
}

export default MenuOverlay;