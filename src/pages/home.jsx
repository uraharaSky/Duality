import { useEffect, useState } from "react";

import Products from "../components/Products";
import "../styles/global.css";
import { Link } from "react-router-dom";
import MenuOverlay from "../components/menuOverlay.jsx";
import Hero from "../components/hero.jsx";

function Home() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
    <>
         <div className = "site-wrapper">
             {/* BACKGROUND PANELS */}
             <div className="panels">

                 {Array.from({ length: 8 }).map((_, i) => (
                     <div className="panel" key={i}></div>
                 ))}

             </div>

             {/* MENU BUTTON */}
             <button
                 className="menu-toggle pixel-font"
                 onClick={() => setMenuOpen(true)}
             >
                 [ MENU ]
             </button>

             <Hero/>
             <Products/>
             {menuOpen && (
                <MenuOverlay
                    onClose={() => setMenuOpen(false)}
                />

             )}
         </div>
    </>
    );




}

export default Home;