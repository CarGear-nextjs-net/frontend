import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(true);

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
      behavior: "smooth",
    });
  };

  return (
    isVisible && (
      <button
        onClick={scrollToTop}
        className="rounded-full cursor-pointer w-12 h-12 flex bg-white items-center justify-center text-black shadow-lg hover:scale-105 transition-transform duration-200"
        aria-label="Scroll to top"
      >
        <ArrowUp size={20} />
      </button>
    )
  );
};

export default ScrollToTopButton;
