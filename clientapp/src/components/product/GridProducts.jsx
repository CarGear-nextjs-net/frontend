import CardProduct from "./CardProduct";

export default function GridProducts({products=[],maxProduct=4}) {
    return (<div className="position-relative">
        <div className="d-flex justify-content-center flex-wrap gap-3 grid-products">
            {products.slice(0,maxProduct).map((product) => (
                <CardProduct key={product.id} product={product} />
            ))}
        </div>

    </div>)
}