// app/error.tsx

'use client'; // bắt buộc khi dùng error.tsx

import { useEffect } from 'react';

export default function Error({ error, reset }) {
    useEffect(() => {
        console.error('Lỗi xảy ra:', error);
    }, [error]);

    return (
        <div style={{ padding: 40, textAlign: 'center' }}>
            <h2>Đã có lỗi xảy ra!</h2>
            <p>{error.message}</p>
            <button
                onClick={() => reset()}
                style={{ marginTop: 20, padding: '10px 20px', background: 'tomato', color: 'white' }}
            >
                Thử lại
            </button>
        </div>
    );
}
