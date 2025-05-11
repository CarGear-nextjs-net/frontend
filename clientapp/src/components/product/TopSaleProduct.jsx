import { useRef, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import "./ScollProducts.css";
import CardProduct from "./CardProduct";

export default function ScrollProducts({ products = [], isHindNex = false }) {
    const sliderRef = useRef(null);
    const [showLeftButton, setShowLeftButton] = useState(false);
    const [showRightButton, setShowRightButton] = useState(true);

    useEffect(() => {
        const updateSliderAlignment = () => {
            const slider = sliderRef.current;
            if (!slider) return;

            if (slider.scrollWidth > slider.clientWidth) {
                slider.style.justifyContent = 'flex-start';
                setShowRightButton(true);
            } else {
                slider.style.justifyContent = 'center';
                setShowRightButton(false);
            }

            // Initially left button is hidden
            setShowLeftButton(slider.scrollLeft > 20);
        };

        const handleScroll = () => {
            const slider = sliderRef.current;
            if (!slider) return;

            // Show left button if scrolled right
            setShowLeftButton(slider.scrollLeft > 20);

            // Show right button if not at the end
            const isAtEnd = Math.ceil(slider.scrollLeft + slider.clientWidth) >= slider.scrollWidth - 20;
            setShowRightButton(!isAtEnd);
        };

        updateSliderAlignment();
        window.addEventListener("resize", updateSliderAlignment);

        const slider = sliderRef.current;
        if (slider) {
            slider.addEventListener("scroll", handleScroll);
        }

        return () => {
            window.removeEventListener("resize", updateSliderAlignment);
            if (slider) {
                slider.removeEventListener("scroll", handleScroll);
            }
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
            {/* Container with padding to make space for buttons */}
            <div className="slider-container">
                {/* Gradient overlays */}
                {showLeftButton && !isHindNex && (
                    <div className="slider-gradient-left"></div>
                )}
                {showRightButton && !isHindNex && (
                    <div className="slider-gradient-right"></div>
                )}

                {/* Product slider */}
                <div ref={sliderRef} className="product-slider d-flex gap-3 overflow-auto p-2">
                    {products.map((product, index) => (
                        <CardProduct key={index} product={product} />
                    ))}
                </div>
            </div>

            {!isHindNex && (
                <>
                    {showLeftButton && (
                        <Button
                            variant="light"
                            className="slider-control-prev"
                            onClick={() => scrollProducts("prev")}
                            aria-label="Previous products"
                        >
                            <ChevronLeft size={20} />
                        </Button>
                    )}
                    {showRightButton && (
                        <Button
                            variant="light"
                            className="slider-control-next"
                            onClick={() => scrollProducts("next")}
                            aria-label="Next products"
                        >
                            <ChevronRight size={20} />
                        </Button>
                    )}
                </>
            )}
        </div>
    );
}
