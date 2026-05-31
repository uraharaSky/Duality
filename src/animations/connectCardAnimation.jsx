import { useEffect, useRef } from "react";
import "../styles/animations/connectCardAnimation.css";

const STAR_PATH =
    "M340,-60 L460,160 L180,40 L500,40 L220,160 Z";

const NODES = [
    { cx: 340, cy: -60,  delay: "0.2s",  label: "Top"          },
    { cx: 500, cy: 40,  delay: "0.6s",  label: "Upper Right"  },
    { cx: 460, cy: 160,  delay: "1.0s",  label: "Bottom Right" },
    { cx: 220, cy: 160,  delay: "1.4s",  label: "Bottom Left"  },
    { cx: 180, cy: 40,  delay: "1.8s",  label: "Upper Left"   },
];

export default function StarConnect() {
    const svgRef = useRef(null);

    /* Force animation restart on remount */
    useEffect(() => {
        const els = svgRef.current?.querySelectorAll("[class]");
        els?.forEach((el) => {
            el.style.animationName = "none";
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    el.style.animationName = "";
                });
            });
        });
    }, []);

    return (
        <div className="star-connect-wrapper">
            <svg
                ref={svgRef}
                className="star-connect-svg"
                viewBox="0 0 680 400"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-label="Connect animation – five nodes joined by a continuously drawn five-point star"
            >
                <defs>
                    <marker
                        id="sc-arrow"
                        viewBox="0 0 10 10"
                        refX="8"
                        refY="5"
                        markerWidth="6"
                        markerHeight="6"
                        orient="auto-start-reverse"
                    >
                        <path
                            d="M2 1L8 5L2 9"
                            fill="none"
                            stroke="white"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </marker>
                </defs>

                {/* Ghost / resting star (always faintly visible) */}
                <path
                    className="sc-star-ghost"
                    d={STAR_PATH}
                    fill="none"
                    stroke="white"
                    strokeWidth="3"
                />

                {/* Animated draw stroke */}
                <path
                    className="sc-star-draw"
                    d={STAR_PATH}
                    fill="none"
                    stroke="white"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                {/* Pulse overlay */}
                <path
                    className="sc-star-pulse"
                    d={STAR_PATH}
                    fill="none"
                    stroke="white"
                    strokeWidth="5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                {/* Five outer nodes */}
                {NODES.map(({ cx, cy, delay, label }) => (
                    <circle
                        key={label}
                        className="sc-node"
                        cx={cx}
                        cy={cy}
                        r="5"
                        fill="white"
                        style={{ animationDelay: delay }}
                        aria-label={label}
                    />
                ))}

                {/* Travelling drawing dot */}
                <circle className="sc-travel-dot" cx="0" cy="0" r="5" fill="white" />
            </svg>
        </div>
    );
}