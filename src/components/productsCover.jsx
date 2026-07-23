import { useEffect, useRef, useState} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "../styles/products.css";
import { products } from "../data/productsData.js";

gsap.registerPlugin(ScrollTrigger);

function ProductsCover() {

    const coverRef = useRef(null);
    const titleRef = useRef(null);
    const menuRef = useRef([]);
    const bandRef = useRef(null);
    const [activeProduct, setActiveProduct] = useState("scene0");
    const product = products[activeProduct];
    const pillRef = useRef(null);
    const detailsRef = useRef(null);
    const rightRef = useRef(null);
    const previewRef = useRef(null);
    const leftPanelRef = useRef(null);
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
            tl.to(bandRef.current, {
                scaleX: 1,
                duration: 0.6
            })

                .add("nav")

                .to(pillRef.current, {
                    opacity: 1,
                    scale: 1,
                    duration: 0.25,
                    ease: "back.out(1.7)"
                }, "nav")

                .fromTo(menuRef.current,
                    {
                        opacity: 0,
                        y: 12
                    },
                    {
                        opacity: 1,
                        y: 0,
                        stagger: 0.08,
                        duration: 0.25,
                        ease: "power3.out"
                    }, "nav+=0.05");

            tl.add("content")

                .to(detailsRef.current, {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    ease: "power3.out"
                }, "content")

                .to(rightRef.current, {
                    opacity: 1,
                    x: 0,
                    duration: 0.6,
                    ease: "power3.out"
                }, "content+=0.1");

            // tl.to(bandRef.current, {
            //     scaleX: 1,
            //     ease: "power3.out",
            //     duration: 0.4,
            //
            //     onComplete: () => {
            //
            //         gsap.fromTo(
            //             menuRef.current,
            //             {
            //                 opacity: 0,
            //                 y: 12
            //             },
            //             {
            //                 opacity: 1,
            //                 y: 0,
            //                 stagger: 0.1,
            //                 duration: 0.35,
            //                 ease: "power3.out"
            //             }
            //         );
            //
            //     }
            //
            // }, "<");



        }, coverRef);

        return () => ctx.revert();

    }, []);
    useEffect(() => {

        const button = menuRef.current[0];

        if(!button) return;

        gsap.set(pillRef.current, {
            x: button.offsetLeft,
            width: button.offsetWidth,
            height: button.offsetHeight,
            opacity: 0,
            scale: 0.8
        });

        gsap.set(detailsRef.current, {
            opacity: 0,
            y: 30
        });

        gsap.set(rightRef.current, {
            opacity: 0,
            x: 30
        });

    },[]);
    useEffect(() => {

        const ids = [
            "scene0",
            "ally",
            "finsage",
            "orion",
            "hermit"
        ];

        const index = ids.indexOf(activeProduct);

        const button = menuRef.current[index];

        if (!button) return;

        gsap.to(pillRef.current, {
            x: button.offsetLeft,
            width: button.offsetWidth,
            duration: 0.4,
            ease: "power3.out"
        });


    }, [activeProduct]);

    const showPreview = () => {

        gsap.to(previewRef.current,{
            opacity:1,
            duration:0.25,
            ease:"power2.out"
        });

    };

    const hidePreview = () => {

        gsap.to(previewRef.current,{
            opacity:0,
            duration:0.2,
            ease:"power2.out"
        });

    };

    const movePreview = (e) => {

        const leftRect = leftPanelRef.current.getBoundingClientRect();
        const previewRect = previewRef.current.getBoundingClientRect();

        const gap = 20;

        let x = e.clientX + gap;
        let y = e.clientY + gap;

    // Don't let it cross into the coral panel
        if (x + previewRect.width > leftRect.right) {
            x = e.clientX - previewRect.width - gap;
        }

    // Bottom overflow
        if (y + previewRect.height > window.innerHeight) {
            y = e.clientY - previewRect.height - gap;
        }

        gsap.to(previewRef.current,{
            x,
            y,
            duration:0.15,
            ease:"power3.out"
        });

    };




    return (
        <section
            ref={coverRef}
            className="products-cover"
        >

            <div
                className="products-cover-left"
                ref={leftPanelRef}
            >

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

                        <div
                            ref={pillRef}
                            className="nav-pill"
                        />

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
                            ref={el => menuRef.current[4] = el}
                            className={activeProduct === "hermit" ? "active" : ""}
                            onClick={() => setActiveProduct("hermit")}
                        >
                            Hermit
                        </button>

                    </div>

                </div>

                <div
                    ref = {detailsRef}
                    className = "product-details"
                    onMouseEnter={showPreview}
                    onMouseLeave={hidePreview}
                    onMouseMove={movePreview}
                >

                        <div className="product-row-1">


                            <div className="product-info">

                            <span className = "product-serial">
                                {product.serial}
                            </span>

                                <div className="product-title">

                                    <h2 className = "product-name">
                                        {product.title}
                                    </h2>

                                    <p className="product-tagline">
                                        {product.tagline}
                                    </p>

                                </div>

                            </div>

                            <div className="product-stack">

                                {product.stack.map(item => (

                                    <span key={item}>
                                        {item}
                                     </span>

                                ))}

                            </div>

                        </div>

                        <div className="product-row-2">

                            <div className="product-description">

                                <p>{product.description}</p>

                            </div>

                        </div>
                </div>
            </div>



            <div className="products-cover-right"
            >
                <div
                    ref = {rightRef}
                    className="product-showcase"
                >

                    {product.question.map((line,index)=>(

                        <p key={index}>
                            {line}
                        </p>

                    ))}

                </div>

            </div>

            <div
                ref={previewRef}
                className="product-preview"
            >

                {product.preview ? (

                    <img
                        src={product.preview}
                        alt={product.title}
                    />

                ) : (

                    <div className="preview-placeholder">

                        <span>{product.previewText}</span>

                    </div>

                )}

            </div>

        </section>
    );
}

export default ProductsCover;