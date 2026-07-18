import { useEffect, useRef } from "react";
import "./Cursor.css";

export default function Cursor() {
    const cursorRef = useRef(null);

    useEffect(() => {
        const moveCursor = (e) => {
            if (!cursorRef.current) return;

            cursorRef.current.style.left = `${e.clientX}px`;
            cursorRef.current.style.top = `${e.clientY}px`;
        };

        window.addEventListener("mousemove", moveCursor);

        return () => {
            window.removeEventListener("mousemove", moveCursor);
        };
    }, []);

    return (
        <div className="cursor" ref={cursorRef}>
            <div className="cursor-dot"></div>
        </div>
    );
}