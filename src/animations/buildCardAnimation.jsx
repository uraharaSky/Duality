import { useEffect, useRef } from "react";
import "../styles/about.css";

export default function BuildCardAnimation() {
    const svgRef = useRef(null);
    const animRef = useRef(null);

    useEffect(() => {
        const cx = 340, cy = 200;
        const ARM = 140;

        function ease(t) {
            return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        }

        function animate(dur, fn, done) {
            const start = performance.now();
            let raf;
            function step(now) {
                let t = Math.min((now - start) / dur, 1);
                fn(ease(t));
                if (t < 1) {
                    raf = requestAnimationFrame(step);
                } else if (done) {
                    done();
                }
            }
            raf = requestAnimationFrame(step);
            return () => cancelAnimationFrame(raf);
        }

        function wait(ms, fn) {
            return setTimeout(fn, ms);
        }

        const svg = svgRef.current;
        if (!svg) return;

        const get = (id) => svg.querySelector(`#${id}`);

        function drawLine(id, axis, dir, dur, done) {
            return animate(dur, (t) => {
                const d = ARM * t;
                const el = get(id);
                if (!el) return;
                if (axis === "h") {
                    el.setAttribute(dir === -1 ? "x2" : "x2", cx + dir * d);
                } else {
                    el.setAttribute("y2", cy + dir * d);
                }
            }, done);
        }

        function showNodeOutline(id, dur, done) {
            return animate(dur, (t) => {
                const el = get(id);
                if (el) el.setAttribute("r", 6 * t);
            }, done);
        }

        function fillNode(id, dur, done) {
            return animate(dur, (t) => {
                const el = get(id);
                if (el) el.setAttribute("r", 5 * t);
            }, done);
        }

        function pulse(done) {
            const el = get("pulse");
            if (!el) return;
            el.setAttribute("r", 4);
            el.setAttribute("opacity", 0.8);
            return animate(800, (t) => {
                el.setAttribute("r", 4 + 18 * t);
                el.setAttribute("opacity", 0.8 * (1 - t));
            }, () => {
                el.setAttribute("opacity", 0);
                if (done) done();
            });
        }

        function reset() {
            const ids = ["hl", "hr", "vu", "vd"];
            ids.forEach((id) => {
                const el = get(id);
                if (!el) return;
                if (id === "hl" || id === "hr") {
                    el.setAttribute("x1", cx);
                    el.setAttribute("x2", cx);
                    el.setAttribute("y1", cy);
                    el.setAttribute("y2", cy);
                } else {
                    el.setAttribute("x1", cx);
                    el.setAttribute("x2", cx);
                    el.setAttribute("y1", cy);
                    el.setAttribute("y2", cy);
                }
            });
            ["nl-out","nl-fill","nr-out","nr-fill","nt-out","nt-fill","nb-out","nb-fill"].forEach((id) => {
                const el = get(id);
                if (el) el.setAttribute("r", 0);
            });
        }

        let timeouts = [];
        let stopped = false;

        function sequence() {
            if (stopped) return;
            reset();

            const t1 = wait(300, () => {
                if (stopped) return;

                // Draw horizontal lines
                const hlEl = get("hl");
                const hrEl = get("hr");
                if (hlEl) { hlEl.setAttribute("x1", cx); hlEl.setAttribute("y1", cy); hlEl.setAttribute("y2", cy); }
                if (hrEl) { hrEl.setAttribute("x1", cx); hrEl.setAttribute("y1", cy); hrEl.setAttribute("y2", cy); }

                let hlDone = false, hrDone = false;
                function afterHLines() {
                    if (!hlDone || !hrDone || stopped) return;

                    showNodeOutline("nl-out", 250, () => {
                        if (stopped) return;
                        fillNode("nl-fill", 220, null);
                    });
                    showNodeOutline("nr-out", 250, () => {
                        if (stopped) return;
                        fillNode("nr-fill", 220, () => {
                            if (stopped) return;
                            const t2 = wait(200, () => {
                                if (stopped) return;

                                const vuEl = get("vu");
                                const vdEl = get("vd");
                                if (vuEl) { vuEl.setAttribute("x1", cx); vuEl.setAttribute("x2", cx); vuEl.setAttribute("y1", cy); }
                                if (vdEl) { vdEl.setAttribute("x1", cx); vdEl.setAttribute("x2", cx); vdEl.setAttribute("y1", cy); }

                                let vuDone = false, vdDone = false;
                                function afterVLines() {
                                    if (!vuDone || !vdDone || stopped) return;

                                    showNodeOutline("nt-out", 250, () => {
                                        if (stopped) return;
                                        fillNode("nt-fill", 220, null);
                                    });
                                    showNodeOutline("nb-out", 250, () => {
                                        if (stopped) return;
                                        fillNode("nb-fill", 220, () => {
                                            if (stopped) return;
                                            const t3 = wait(250, () => {
                                                if (stopped) return;
                                                pulse(() => {
                                                    if (stopped) return;
                                                    const t4 = wait(1400, sequence);
                                                    timeouts.push(t4);
                                                });
                                            });
                                            timeouts.push(t3);
                                        });
                                    });
                                }

                                animate(700, (t) => {
                                    const el = get("vu");
                                    if (el) el.setAttribute("y2", cy - ARM * t);
                                }, () => { vuDone = true; afterVLines(); });

                                animate(700, (t) => {
                                    const el = get("vd");
                                    if (el) el.setAttribute("y2", cy + ARM * t);
                                }, () => { vdDone = true; afterVLines(); });
                            });
                            timeouts.push(t2);
                        });
                    });
                }

                animate(700, (t) => {
                    const el = get("hl");
                    if (el) el.setAttribute("x2", cx - ARM * t);
                }, () => { hlDone = true; afterHLines(); });

                animate(700, (t) => {
                    const el = get("hr");
                    if (el) el.setAttribute("x2", cx + ARM * t);
                }, () => { hrDone = true; afterHLines(); });
            });
            timeouts.push(t1);
        }

        sequence();

        return () => {
            stopped = true;
            timeouts.forEach(clearTimeout);
        };
    }, []);

    return (
        <div className="build-animation">
            <svg
                ref={svgRef}
                height="100%"
                width="100%"
                viewBox="0 0 680 400"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-label="Idea becoming a system animation"
            >
                <style>{`
          .line-h, .line-v { stroke: white; stroke-width: 3; stroke-linecap: round; }
          .node-outline { fill: none; stroke: white; stroke-width: 2; }
          .node-fill { fill: white; }
          .center-pulse { fill: none; stroke: white; stroke-width: 2; }
        `}</style>

                {/* Horizontal lines */}
                <line id="hl" x1="340" y1="200" x2="560" y2="200" className="line-h" />
                <line id="hr" x1="340" y1="200" x2="760" y2="200" className="line-h" />

                {/* Vertical lines */}
                <line id="vu" x1="340" y1="200" x2="340" y2="200" className="line-v" />
                <line id="vd" x1="340" y1="200" x2="340" y2="200" className="line-v" />

                {/* Left node */}
                <circle id="nl-out" cx="160" cy="200" r="0" className="node-outline" />
                <circle id="nl-fill" cx="160" cy="200" r="0" className="node-fill" />

                {/* Right node */}
                <circle id="nr-out" cx="520" cy="200" r="0" className="node-outline" />
                <circle id="nr-fill" cx="520" cy="200" r="0" className="node-fill" />

                {/* Top node */}
                <circle id="nt-out" cx="340" cy="60" r="0" className="node-outline" />
                <circle id="nt-fill" cx="340" cy="60" r="0" className="node-fill" />

                {/* Bottom node */}
                <circle id="nb-out" cx="340" cy="340" r="0" className="node-outline" />
                <circle id="nb-fill" cx="340" cy="340" r="0" className="node-fill" />

                {/* Center node */}
                <circle id="center" cx="340" cy="200" r="7" fill="white" />

                {/* Pulse ring */}
                <circle id="pulse" cx="340" cy="200" r="7" className="center-pulse" opacity="0" />
            </svg>
        </div>
    );
}