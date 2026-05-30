import { useEffect, useRef } from "react";

const XS = [170, 300, 380, 510];
const BASE = 150;
const AMP = 55;
const WAVE_Y = [BASE, BASE - AMP, BASE + AMP, BASE];

function ease(t) { return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t; }
function lerp(a, b, t) { return a + (b - a) * t; }
function lerp2(a, b, t) { return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]; }

function partialPath(ys, seg, t) {
    let d = `M ${XS[0]} ${ys[0]}`;
    for (let i = 0; i < seg; i++) {
        const cpx = (XS[i] + XS[i + 1]) / 2;
        d += ` C ${cpx} ${ys[i]}, ${cpx} ${ys[i + 1]}, ${XS[i + 1]} ${ys[i + 1]}`;
    }
    if (seg < 3 && t > 0) {
        const p0 = [XS[seg], ys[seg]];
        const p3 = [XS[seg + 1], ys[seg + 1]];
        const cpx = (p0[0] + p3[0]) / 2;
        const p1 = [cpx, p0[1]];
        const p2 = [cpx, p3[1]];
        const q0 = lerp2(p0, p1, t), q1 = lerp2(p1, p2, t), q2 = lerp2(p2, p3, t);
        const r0 = lerp2(q0, q1, t), r1 = lerp2(q1, q2, t);
        const s = lerp2(r0, r1, t);
        d += ` C ${q0[0]} ${q0[1]}, ${r0[0]} ${r0[1]}, ${s[0]} ${s[1]}`;
    }
    return d;
}

function pointOnWave(t, ys) {
    const segs = 3;
    const g = t * segs;
    const seg = Math.min(Math.floor(g), segs - 1);
    const st = g - seg;
    const p0 = [XS[seg], ys[seg]];
    const p3 = [XS[seg + 1], ys[seg + 1]];
    const cpx = (p0[0] + p3[0]) / 2;
    const p1 = [cpx, p0[1]];
    const p2 = [cpx, p3[1]];
    const q0 = lerp2(p0, p1, st), q1 = lerp2(p1, p2, st), q2 = lerp2(p2, p3, st);
    const r0 = lerp2(q0, q1, st), r1 = lerp2(q1, q2, st);
    return lerp2(r0, r1, st);
}

export default function SimulateCardAnimation() {
    const svgRef = useRef(null);

    useEffect(() => {
        const svg = svgRef.current;
        if (!svg) return;

        const dotEls = XS.map((_, i) => svg.querySelector(`#sim-d${i}`));
        const wpEl = svg.querySelector("#sim-wp");
        const pulseEl = svg.querySelector("#sim-pulse");

        let stopped = false;
        const timers = [];

        function wait(ms, fn) {
            const id = setTimeout(() => { if (!stopped) fn(); }, ms);
            timers.push(id);
        }

        function reset() {
            dotEls.forEach(d => {
                d.setAttribute("fill", "none");
                d.setAttribute("cy", BASE);
            });
            wpEl.setAttribute("d", "");
            pulseEl.setAttribute("opacity", "0");
        }

        function dropAndConnect(done) {
            const ys = [BASE, BASE, BASE, BASE];
            dotEls[0].setAttribute("fill", "white");

            function dropDot(i, cb) {
                const dur = 500;
                const start = performance.now();
                let raf;
                function step(now) {
                    if (stopped) return;
                    const t = Math.min((now - start) / dur, 1);
                    const et = ease(t);
                    ys[i] = lerp(BASE, WAVE_Y[i], et);
                    dotEls[i].setAttribute("cy", ys[i]);
                    if (i > 0) {
                        wpEl.setAttribute("d", partialPath(ys, i - 1, et));
                    } else {
                        wpEl.setAttribute("d", `M ${XS[0]} ${ys[0]}`);
                    }
                    if (t < 1) {
                        raf = requestAnimationFrame(step);
                    } else {
                        ys[i] = WAVE_Y[i];
                        dotEls[i].setAttribute("cy", WAVE_Y[i]);
                        dotEls[i].setAttribute("fill", "white");
                        if (i < 3) wpEl.setAttribute("d", partialPath(ys, i, 1));
                        if (cb) cb();
                    }
                }
                raf = requestAnimationFrame(step);
            }

            function next(i) {
                if (i > 3) { done(); return; }
                wait(i === 0 ? 0 : 80, () => dropDot(i, () => next(i + 1)));
            }
            next(0);
        }

        function runPulse(done) {
            const ys = [...WAVE_Y];
            pulseEl.setAttribute("opacity", "1");
            const dur = 1000;
            const start = performance.now();
            function step(now) {
                if (stopped) return;
                const t = Math.min((now - start) / dur, 1);
                const [px, py] = pointOnWave(ease(t), ys);
                pulseEl.setAttribute("cx", px);
                pulseEl.setAttribute("cy", py);
                const fade = t > 0.8 ? 1 - (t - 0.8) / 0.2 : 1;
                pulseEl.setAttribute("opacity", fade);
                if (t < 1) requestAnimationFrame(step);
                else { pulseEl.setAttribute("opacity", "0"); if (done) done(); }
            }
            requestAnimationFrame(step);
        }

        function sequence() {
            if (stopped) return;
            reset();
            wait(400, () => {
                dropAndConnect(() => {
                    wait(200, () => {
                        runPulse(() => {
                            wait(150, () => {
                                runPulse(() => {
                                    wait(700, sequence);
                                });
                            });
                        });
                    });
                });
            });
        }

        sequence();

        return () => {
            stopped = true;
            timers.forEach(clearTimeout);
        };
    }, []);

    return (
        <div style={{ width: "100%", maxWidth: "720px", margin: "0 auto", aspectRatio: "680 / 300" }}>
            <svg
                ref={svgRef}
                width="100%"
                height="100%"
                viewBox="0 0 680 300"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-label="Simulate: dots fill as a wave line connects them, then a pulse travels left to right"
            >
                <defs>
                    <clipPath id="sim-clip">
                        <rect x="0" y="0" width="720" height="300" />
                    </clipPath>
                </defs>

                <path
                    id="sim-wp"
                    fill="none"
                    stroke="white"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    clipPath="url(#sim-clip)"
                    d=""
                />

                {XS.map((x, i) => (
                    <circle
                        key={i}
                        id={`sim-d${i}`}
                        cx={x}
                        cy={BASE}
                        r="4"
                        fill="none"
                        stroke="white"
                        strokeWidth="2"
                    />
                ))}

                <circle
                    id="sim-pulse"
                    r="4"
                    fill="none"
                    stroke="white"
                    strokeWidth="4"
                    opacity="0"
                />
            </svg>
        </div>
    );
}