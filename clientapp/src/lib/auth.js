
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'; // nên dùng biến môi trường

export function decodeJwtToken(token) {
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        return decoded; // Ví dụ: { id, name, email, role, iat, exp }
    } catch (error) {
        console.error('Invalid JWT:', error.message);
        return null;
    }
}
