require('dotenv').config();
const { createServer } = require('https');
const { parse } = require('url');
const next = require('next');
const fs = require('fs');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

// Lấy biến môi trường (bạn cũng có thể dùng process.env nếu đã cấu hình file .env.local)
const pfxPath = 'C:\\Windows\\System32\\certificate.pfx';
const pfxPassword = '123';

// Đọc file chứng chỉ
const httpsOptions = {
    pfx: fs.readFileSync(pfxPath),
    passphrase: pfxPassword
};

// Chạy server ở cổng 3000
app.prepare().then(() => {
    createServer(httpsOptions, (req, res) => {
        const parsedUrl = parse(req.url, true);
        handle(req, res, parsedUrl);
    }).listen(3000, err => {
        if (err) throw err;
        console.log('✅ Ready on https://localhost:3000');
    });
});
