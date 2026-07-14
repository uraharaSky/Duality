import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "../styles/products.css";

gsap.registerPlugin(ScrollTrigger);

function ProductsCover() {

    const coverRef = useRef(null);
    const titleRef = useRef(null);

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

            tl.to(titleRef.current, {
                scale: 0.28,
                x: -215,
                y: -190,
                ease: "none",
            });

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

            </div>

            <div className="products-cover-right" />

        </section>
    );
}

export default ProductsCover;