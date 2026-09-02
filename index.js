const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// سجل الطلبات لمعرفة ما تطلبه اللعبة
app.use((req, res, next) => {
    console.log(`[${new Date().toLocaleTimeString()}] ${req.method} -> ${req.url}`);
    next();
});

// المسار الرئيسي للفتح من المتصفح
app.get('/', (req, res) => {
    res.send('Server Free Fire v1.70.0 is running!');
});

// استجابة اللعبة الخاصة بمسار live
app.all('/live/*', (req, res) => {
    res.json({
        status: 0,
        result: 0,
        msg: "success",
        version: "1.70.0",
        data: {
            server_status: 1,
            maintenance: false,
            login_state: 1
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
