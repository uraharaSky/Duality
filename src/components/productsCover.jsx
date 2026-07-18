import { useEffect, useRef, useState} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "../styles/products.css";

gsap.registerPlugin(ScrollTrigger);

function ProductsCover() {

    const coverRef = useRef(null);
    const titleRef = useRef(null);
    const menuRef = useRef([]);
    const bandRef = useRef(null);
    const [activeProduct, setActiveProduct] = useState("scene0");
    // const menuAnimated = useRef(false);

    useEffect(() => {

        const ctx = gsap.context(() => {

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: coverRef.current,
                    start: "top top",
                    end: "+=600",
                    scrub: true,
                    pin: true,
                    anticipatePin: 1,
                }
            });


// 1. Shrink PRODUCTS
            tl.to(titleRef.current, {
                scale: 0.28,
                x: -360,
                y: -210,
                ease: "none",
                duration: 0.6
            });

// 2. Grow Coral Band
            tl.to(bandRef.current,{
                scaleX:1,
                ease:"none",
                duration:0.6
            });

            tl.fromTo(
                menuRef.current,
                {
                    opacity:0,
                    y:12
                },
                {
                    opacity:1,
                    y:0,
                    stagger:0.08,
                    ease:"power3.out",
                    duration:0.25
                }
            );

            tl.to(bandRef.current, {
                scaleX: 1,
                ease: "power3.out",
                duration: 0.4,

                onComplete: () => {

                    gsap.fromTo(
                        menuRef.current,
                        {
                            opacity: 0,
                            y: 12
                        },
                        {
                            opacity: 1,
                            y: 0,
                            stagger: 0.1,
                            duration: 0.35,
                            ease: "power3.out"
                        }
                    );

                }

            }, "<");



        }, coverRef);

        return () => ctx.revert();

    }, []);

    return (
        <section
            ref={coverRef}
            className="products-cover"
        >

            <div className="products-cover-left">

                <h1
                    ref={titleRef}
                    className="products-cover-title"
                >
                    Products
                </h1>

                {/* Navigation Band */}
                <div
                    ref={bandRef}
                    className="products-nav-band"
                >

                    <div className="products-nav">

                        <button
                            ref={el => menuRef.current[0] = el}
                            className={activeProduct === "scene0" ? "active" : ""}
                            onClick={() => setActiveProduct("scene0")}
                        >
                            Scene0
                        </button>

                        <button
                            ref={el => menuRef.current[1] = el}
                            className={activeProduct === "ally" ? "active" : ""}
                            onClick={() => setActiveProduct("ally")}
                        >
                            Ally
                        </button>

                        <button
                            ref={el => menuRef.current[2] = el}
                            className={activeProduct === "finsage" ? "active" : ""}
                            onClick={() => setActiveProduct("finsage")}
                        >
                            FinSage
                        </button>

                        <button
                            ref={el => menuRef.current[3] = el}
                            className={activeProduct === "orion" ? "active" : ""}
                            onClick={() => setActiveProduct("orion")}
                        >
                            Orion
                        </button>

                        <button
                            ref={el => menuRef.current[3] = el}
                            className={activeProduct === "hermit" ? "active" : ""}
                            onClick={() => setActiveProduct("hermit")}
                        >
                            Hermit
                        </button>

                    </div>

                </div>

            </div>

            <div className="products-cover-right" />

        </section>
    );
}

export default ProductsCover;