import { useEffect, useRef, useState } from "react";

import "./Cursor.css";

export default function Cursor() {
    const cursorRef = useRef(null);

    // Shape
    const [cursorShape, setCursorShape] = useState("circle");

    // Theme
    const [cursorTheme, setCursorTheme] = useState("dark");

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

        window.addEventListener("mousemove", moveCursor);
        window.addEventListener("mouseover", handlePointer);

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            window.removeEventListener("mouseover", handlePointer);
        };
    }, []);

    return (
        <div
            ref={cursorRef}
            className={`cursor ${cursorShape} ${cursorTheme}`}
        >
            <div className="cursor-ring"></div>
            <div className="cursor-dot"></div>
        </div>
    );
}