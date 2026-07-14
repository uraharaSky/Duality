import "../styles/products.css"



function Products() {
    return(
        /* PRODUCTS SECTION */
        <section id="products" className="products-section">

            <div className="products-left">

                <h2 className="products-title-pixel-font">
                    Products
                </h2>



                <div className="product-tabs">
                    <button>Scen0</button>
                    <button>Ally</button>
                    <button>FinSage</button>
                    <button>Orion</button>
                    <button>Hermit</button>
                </div>

                <div className="product-stack">

                    <div className="stack-card back-2"></div>
                    <div className="stack-card back-1"></div>
                    <div className="stack-card front"></div>

                </div>

            </div>

            <div className="products-right">

                <div className="divider-group">

                    <div className="divider divider-dashed"></div>
                    <div className="divider divider-solid"></div>

                </div>

                <div className="products-copy pixel-font">

                    <span>Products ↗</span>

                    <span>shaped by</span>

                    <span>human</span>

                    <span>behavior</span>

                </div>

            </div>

    </section>

    );
}

export default Products;