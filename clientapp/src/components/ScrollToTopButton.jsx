import React, { useState, useEffect } from "react";
import {ArrowUp } from "lucide-react"
import {Button} from "react-bootstrap";
const ScrollToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    // Kiểm tra vị trí cuộn
    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    // Cuộn lên đầu trang
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    return (
        isVisible && (
            <Button
                onClick={scrollToTop}
                style={{
                    padding: "10px 15px",
                    fontSize: "20px",
                    backgroundColor: "#333",
                    color: "#fff",
                    border: "none",
                    borderRadius: "50%",
                    cursor: "pointer",
                    boxShadow: "0 4px 6px rgba(0,0,0,0.3)"
                }}
            >
                <ArrowUp size={20}/>
            </Button>
        )
    );
};

export default ScrollToTopButton;
