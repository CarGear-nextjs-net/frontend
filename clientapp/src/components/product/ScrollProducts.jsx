import { useRef, useEffect } from "react";
import { Button } from "react-bootstrap";
import {ChevronLeft, ChevronRight} from "lucide-react";
import "./ScollProducts.css";
import CardProduct from "./CardProduct";

export default function ScrollProducts({ products = [], isHindNex = false }) {
    const sliderRef = useRef(null);
    useEffect(() => {
        const updateSliderAlignment = () => {
            const slider = sliderRef.current;
            if (!slider) return;

            if (slider.scrollWidth > slider.clientWidth) {
                slider.style.justifyContent = 'flex-start';
            } else {
                slider.style.justifyContent = 'center';
            }
        };

        updateSliderAlignment();
        window.addEventListener("resize", updateSliderAlignment);

        return () => {
            window.removeEventListener("resize", updateSliderAlignment);
        };
    }, [products.length]);

    const scrollProducts = (direction) => {
        if (sliderRef.current) {
            const scrollAmount = sliderRef.current.clientWidth / 2;
            sliderRef.current.scrollBy({
                left: direction === "next" ? scrollAmount : -scrollAmount,
                behavior: "smooth",
            });
        }
    };

    return (
        <div className="scrollproducts position-relative">
            <div ref={sliderRef} className="product-slider d-flex gap-3 overflow-auto p-2">
                {products.map((product) => (
                    <CardProduct product={product} />
                ))}
            </div>

            {!isHindNex && (
                <>
                    <Button
                        variant="light"
                        className="position-absolute top-50 start-0 ms-3 translate-middle-y rounded-circle p-1 d-none d-md-block slider-control-prev"
                        style={{ width: "40px", height: "40px", zIndex: 10 }}
                        onClick={() => scrollProducts("prev")}
                    >
                        <ChevronLeft size={20} />
                    </Button>
                    <Button
                        variant="light"
                        className="position-absolute top-50 end-0 me-3 translate-middle-y rounded-circle p-1 d-none d-md-block slider-control-next"
                        style={{ width: "40px", height: "40px", zIndex: 10 }}
                        onClick={() => scrollProducts("next")}
                    >
                        <ChevronRight size={20} />
                    </Button>
                </>
            )}
        </div>
    );
}
