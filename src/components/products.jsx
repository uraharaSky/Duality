import "../styles/products.css"
import ProductCard from "./ProductCard";

import { useState } from "react";
import products from "../data/productsData";



function Products() {

    const [activeProduct, setActiveProduct] = useState(0);

    const [deckOrder, setDeckOrder] = useState([
        0,
        1,
        2
    ]);
    return(
        /* PRODUCTS SECTION */
        <section id="products" className="products-section">

            <div className="products-left">


                <div className="product-stack">

                    <ProductCard
                        product={products[2]}
                        position="back-2"
                    />

                    <ProductCard
                        product={products[1]}
                        position="back-1"
                    />

                    <ProductCard
                        product={products[0]}
                        position="front"
                    />

                </div>

            </div>

            <div className="products-right">

                <div className="divider-group">

                    <div className="divider divider-dashed"></div>
                    <div className="divider divider-solid"></div>

                </div>

            </div>

    </section>

    );
}

export default Products;