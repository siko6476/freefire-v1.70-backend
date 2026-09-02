const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    console.log(`[${new Date().toLocaleTimeString()}] ${req.method} -> ${req.url}`);
    next();
});

app.get('/', (req, res) => {
    res.send('Free Fire v1.70.0 Server is Live');
});

// التعامل مع طلب ver.php المباشر الذي تطلبه اللعبة
app.all(['/live/ver.php', '/ver.php'], (req, res) => {
    res.json({
        status: 0,
        result: 0,
        version: "1.70.4",
        test_version: "1.70.4",
        gate_ip: "127.0.0.1",
        gate_port: 7000,
        cdn_url: "",
        white_list: 0,
        msg: "success"
    });
});

// أي مسارات أخرى تحت /live/
app.all('/live/*', (req, res) => {
    res.json({
        status: 0,
        result: 0,
        msg: "success",
        version: "1.70.4"
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
