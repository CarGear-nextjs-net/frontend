import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const PaginationComponent = ({
                                 currentPage,
                                 totalPages,
                                 onPageChange,
                                 containerStyle = {},
                                 buttonClassName = '',
                                 activeButtonStyle = {},
                                 inactiveButtonStyle = {},
                             }) => {
    const renderPages = () => {
        const pages = [];

        if (totalPages <= 10) {
            // Hiển thị đầy đủ nếu <= 10 trang
            for (let i = 1; i <= totalPages; i++) {
                pages.push(
                    <button
                        key={i}
                        onClick={() => onPageChange(i)}
                        className={buttonClassName}
                        style={{
                            margin: '0 5px',
                            border: '1px solid #ccc',
                            padding: '5px 10px',
                            backgroundColor: currentPage === i ? '#4caf50' : '#eee',
                            color: currentPage === i ? 'white' : 'black',
                            ...(currentPage === i ? activeButtonStyle : inactiveButtonStyle),
                        }}
                    >
                        {i}
                    </button>
                );
            }
        } else {
            // Dùng ... nếu > 10 trang
            const showLeftDots = currentPage > 4;
            const showRightDots = currentPage < totalPages - 3;

            const startPage = Math.max(2, currentPage - 1);
            const endPage = Math.min(totalPages - 1, currentPage + 1);

            // Always show first page
            pages.push(
                <button
                    key={1}
                    onClick={() => onPageChange(1)}
                    className={buttonClassName}
                    style={{
                        margin: '0 5px',
                        border: '1px solid #ccc',
                        padding: '5px 10px',
                        backgroundColor: currentPage === 1 ? '#4caf50' : '#eee',
                        color: currentPage === 1 ? 'white' : 'black',
                        ...(currentPage === 1 ? activeButtonStyle : inactiveButtonStyle),
                    }}
                >
                    1
                </button>
            );

            if (showLeftDots) {
                pages.push(<span key="left-dots" style={{ margin: '0 5px' }}>...</span>);
            }

            for (let i = startPage; i <= endPage; i++) {
                pages.push(
                    <button
                        key={i}
                        onClick={() => onPageChange(i)}
                        className={buttonClassName}
                        style={{
                            margin: '0 5px',
                            border: '1px solid #ccc',
                            padding: '5px 10px',
                            backgroundColor: currentPage === i ? '#4caf50' : '#eee',
                            color: currentPage === i ? 'white' : 'black',
                            ...(currentPage === i ? activeButtonStyle : inactiveButtonStyle),
                        }}
                    >
                        {i}
                    </button>
                );
            }

            if (showRightDots) {
                pages.push(<span key="right-dots" style={{ margin: '0 5px' }}>...</span>);
            }

            // Always show last page
            pages.push(
                <button
                    key={totalPages}
                    onClick={() => onPageChange(totalPages)}
                    className={buttonClassName}
                    style={{
                        margin: '0 5px',
                        border: '1px solid #ccc',
                        padding: '5px 10px',
                        backgroundColor: currentPage === totalPages ? '#4caf50' : '#eee',
                        color: currentPage === totalPages ? 'white' : 'black',
                        ...(currentPage === totalPages ? activeButtonStyle : inactiveButtonStyle),
                    }}
                >
                    {totalPages}
                </button>
            );
        }

        return pages;
    };

    return (
        <div style={{ marginTop: 20, ...containerStyle }}>
            <button
                onClick={() => {
                    if (currentPage > 1) {
                        onPageChange(currentPage - 1);
                    }
                }}
                className={buttonClassName}
                style={{ marginRight: 10 }}
                disabled={currentPage <= 1} // Vô hiệu hóa nút nếu đang ở trang đầu
            >
                <ChevronLeft size={20} />
            </button>
            {renderPages()}
            <button
                onClick={() => {
                    if (currentPage < totalPages) {
                        onPageChange(currentPage + 1);
                    }
                }}
                className={buttonClassName}
                style={{ marginLeft: 10 }}
                disabled={currentPage >= totalPages} // Vô hiệu hóa nút nếu đang ở trang cuối
            >
                <ChevronRight size={20} />
            </button>
        </div>
    );

};

export default PaginationComponent;
