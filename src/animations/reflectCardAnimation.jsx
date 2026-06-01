import { useEffect, useRef } from "react";
import "../styles/animations/reflectCardAnimation.css";

const DOTS = 4;

export default function ReflectAnimation() {
    const outlineRefs = useRef([]);
    const fillRefs = useRef([]);
    const rafRef = useRef(null);
    const timerRef = useRef(null);

    useEffect(() => {
        const outlines = outlineRefs.current;
        const fills = fillRefs.current;

        function ease(t) {
            return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        }

        function animateProp(el, prop, from, to, duration) {
            return new Promise((resolve) => {
                const start = performance.now();
                function step(now) {
                    const t = Math.min((now - start) / duration, 1);
                    el.style[prop] = from + (to - from) * ease(t);
                    if (t < 1) {
                        rafRef.current = requestAnimationFrame(step);
                    } else {
                        resolve();
                    }
                }
                rafRef.current = requestAnimationFrame(step);
            });
        }

        function wait(ms) {
            return new Promise((resolve) => {
                timerRef.current = setTimeout(resolve, ms);
            });
        }

        let cancelled = false;

        async function runCycle() {
            // Timing constants (ms)
            const OUTLINE_DUR = 550;
            const FILL_DUR    = 700;
            const BETWEEN     = 300;
            const HOLD        = 1800;
            const FADE_DUR    = 1100;
            const PAUSE       = 1300;

            // Fill dots one by one
            for (let i = 0; i < DOTS; i++) {
                if (cancelled) return;
                await animateProp(outlines[i], "opacity", 0, 1, OUTLINE_DUR);
                if (cancelled) return;
                await animateProp(fills[i], "opacity", 0, 1, FILL_DUR);
                if (cancelled) return;
                if (i < DOTS - 1) await wait(BETWEEN);
            }

            if (cancelled) return;
            await wait(HOLD);
            if (cancelled) return;

            // Fade everything out together
            const fadeStart = performance.now();
            await Promise.all([
                ...fills.map((el) => animateProp(el, "opacity", 1, 0, FADE_DUR)),
                ...outlines.map((el) => animateProp(el, "opacity", 1, 0, FADE_DUR)),
            ]);

            if (cancelled) return;
            await wait(PAUSE);
        }

        async function loop() {
            while (!cancelled) {
                await runCycle();
            }
        }

        loop();

        return () => {
            cancelled = true;
            cancelAnimationFrame(rafRef.current);
            clearTimeout(timerRef.current);
        };
    }, []);

    const cx = (i) => 290 + i * 24;

    return (
        <div className="reflect-wrapper">
            <svg
                className="reflect-svg"
                viewBox="0 0 680 200"
                xmlns="http://www.w3.org/2000/svg"
                aria-label="Reflect — a thought slowly becoming clear"
            >
                {Array.from({ length: DOTS }).map((_, i) => (
                    <g key={i}>
                        <circle
                            ref={(el) => (outlineRefs.current[i] = el)}
                            className="reflect-outline"
                            cx={cx(i)}
                            cy={100}
                            r={7}
                        />
                        <circle
                            ref={(el) => (fillRefs.current[i] = el)}
                            className="reflect-fill"
                            cx={cx(i)}
                            cy={100}
                            r={7}
                        />
                    </g>
                ))}
            </svg>
        </div>
    );
}