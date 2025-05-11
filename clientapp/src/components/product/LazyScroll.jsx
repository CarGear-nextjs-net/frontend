import { useState, useEffect, useRef } from 'react';
import './LazyWrapper.css'; // Đảm bảo bạn đã thêm file CSS cho hiệu ứng fade-in

const LazyWrapper = ({ children }) => {
    const [inView, setInView] = useState(false);
    const observerRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setInView(true);
                    }
                });
            },
            {
                threshold: 0.1, // 10% phần tử vào màn hình
                rootMargin: '100px',
            }
        );

        if (observerRef.current) {
            observer.observe(observerRef.current);
        }

        return () => {
            if (observerRef.current) {
                observer.unobserve(observerRef.current);
            }
        };
    }, []);

    return (
        <div
            ref={observerRef}
            className={`lazy-wrapper ${inView ? 'fade-in' : ''}`}
        >
            {inView ? children : null}
        </div>
    );
};

export default LazyWrapper;
