function ProductCard({ product, position }) {

    return (

        <div className={`product-card ${position}`}>

            <div className="product-card-header">

                <div className="product-logo">

                </div>

                <span className="product-status">
                    Coming Soon
                </span>

            </div>

            <div className="product-card-body">

                <h2>{product.name}</h2>

                <p>{product.tagline}</p>

            </div>

            <div className="product-card-footer">

                <span>Explore ↗</span>

            </div>

        </div>

    );

}

export default ProductCard;