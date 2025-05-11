import { useState, useEffect } from 'react';

function useMediaQuery(query) {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        // Kiểm tra nếu đang ở phía client (tránh lỗi khi chạy trên server)
        if (typeof window !== "undefined") {
            const media = window.matchMedia(query);
            const listener = () => setMatches(media.matches);
            media.addListener(listener);
            listener(); // Set giá trị ban đầu
            return () => media.removeListener(listener);
        }
    }, [query]);

    return matches;
}

export default useMediaQuery;
