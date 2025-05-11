import {Button} from "react-bootstrap";
import { Star, Eye } from "lucide-react"; // thêm icon Eye
import {formatPrice} from "../../utils/format.jsx";
import "./CardProduct.css";

export default function CardProduct({product = {}} ) {
    return (
        <div
            className="card-product p-2 border rounded shadow-sm d-flex flex-column align-items-center text-center"

        >
            <div className="position-relative w-100 mb-2 overflow-hidden" style={{ height: "120px" }}>
                <a href={`/product/${product.slug}`} className="w-100 h-100 d-block">
                    <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-100 h-100 rounded  object-fit-cover"
                        style={{ objectFit: "cover" }}
                    />
                    {/* Lớp mờ + icon */}
                    <div className="image-overlay  d-flex justify-content-center align-items-center">
                        <Eye size={24} className="text-white" />
                    </div>
                </a>
            </div>

            <a href={`/product/${product.slug}`} className="mb-1 w-100" style={{ textDecoration: "none", color: "black" }}>
                <div className="small fw-bold text-truncate">{product.name}</div>
            </a>

            <div className="d-flex align-items-center justify-content-center mb-1">
                {[...Array(5)].map((_, i) => (
                    <Star
                        key={i}
                        size={14}
                        className={i < product.rating ? "text-warning" : "text-muted"}
                        fill={i < product.rating ? "currentColor" : "none"}
                    />
                ))}
                <small className="ms-1 text-muted">({product.reviews})</small>
            </div>

            <div className="mb-2 w-100">
                <div className="fw-bold text-danger">{formatPrice(product.price)}</div>
                {product.discount > 0 && (
                    <div className="text-muted text-decoration-line-through small">
                        {formatPrice(product.oldPrice)}
                    </div>
                )}
            </div>

            <a href={`/product/${product.slug}`} className="w-100">
                <Button variant="danger" className="w-100 btn-sm">
                    Chi tiết
                </Button>
            </a>
        </div>
    )
}
