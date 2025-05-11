import { useState, useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import CardProduct from "./CardProduct";

function ResponsiveCarousel({ topSaleProduct= [] }) {
    const [itemsPerSlide, setItemsPerSlide] = useState(2);

    useEffect(() => {
        const updateItemsPerSlide = () => {
            const width = window.innerWidth;
            if (width >= 1200) {
                setItemsPerSlide(5); // Desktop
            } else if (width >= 768) {
                setItemsPerSlide(3); // Tablet
            } else {
                setItemsPerSlide(1); // Mobile
            }
        };

        updateItemsPerSlide(); // Gọi lúc đầu tiên
        window.addEventListener("resize", updateItemsPerSlide);

        return () => window.removeEventListener("resize", updateItemsPerSlide);
    }, []);

    return (
        <Carousel className="mb-4">
            {Array.from({ length: Math.ceil(topSaleProduct.length / itemsPerSlide) }).map((_, index) => {
                const group = topSaleProduct.slice(index * itemsPerSlide, index * itemsPerSlide + itemsPerSlide);
                return (
                    <Carousel.Item key={index}>
                        <div className="d-flex justify-content-center">
                            {group.map((product) => (
                                <CardProduct key={product.id} product={product} />
                            ))}
                        </div>
                    </Carousel.Item>
                );
            })}
        </Carousel>
    );
}

export default ResponsiveCarousel;
