import { useEffect, useRef, useState } from "react";

import "./Cursor.css";

export default function Cursor() {
    const cursorRef = useRef(null);

    // Shape
    const [cursorShape, setCursorShape] = useState("circle");

    // Theme
    const [cursorTheme, setCursorTheme] = useState("dark");
    const [isScrolling, setIsScrolling] = useState(false);

    useEffect(() => {
        // --------------------
        // Mouse Movement
        // --------------------

        const moveCursor = (e) => {
            if (!cursorRef.current) return;

            cursorRef.current.style.left = `${e.clientX}px`;
            cursorRef.current.style.top = `${e.clientY}px`;
        };

        // --------------------
        // Hover Detection
        // --------------------

        const handlePointer = (e) => {
            const target = e.target;

            // ---------- Cursor Shape ----------

            const cursorElement = target.closest("[data-cursor]");

            if (cursorElement) {
                setCursorShape(cursorElement.dataset.cursor);
            } else {
                setCursorShape("circle");
            }

            // ---------- Cursor Theme ----------

            const themeElement = target.closest("[data-cursor-theme]");

            if (themeElement) {
                setCursorTheme(themeElement.dataset.cursorTheme);
            } else {
                setCursorTheme("dark");
            }
        };

        let scrollTimeout;

        const handleScroll = () => {

            setIsScrolling(true);

            clearTimeout(scrollTimeout);

            scrollTimeout = setTimeout(() => {
                setIsScrolling(false);
            }, 120);
        };

        window.addEventListener("mousemove", moveCursor);
        window.addEventListener("mouseover", handlePointer);
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            window.removeEventListener("mouseover", handlePointer);
            window.removeEventListener("scroll", handleScroll);

            clearTimeout(scrollTimeout);
        };
    }, []);

    return (
        <div
            ref={cursorRef}
            className={`
                cursor
                ${cursorShape}
                ${cursorTheme}
                ${isScrolling ? "scrolling" : ""}
            `}
        >
            <div className="cursor-ring"></div>
            <div className="cursor-dot"></div>
        </div>
    );
}