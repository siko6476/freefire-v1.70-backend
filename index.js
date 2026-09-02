const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// معالجة البيانات القادمة بترميز JSON و Form-Data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// طباعة كل طلب يصل من اللعبة لمعرفة المسارات التي تستدعيها
app.use((req, res, next) => {
    console.log(`[${new Date().toLocaleTimeString()}] ${req.method} -> ${req.url}`);
    if (Object.keys(req.body).length > 0) {
        console.log('Payload:', JSON.stringify(req.body));
    }
    next();
});

// المسار الرئيسي لتأكيد تشغيل السيرفر
app.get('/', (req, res) => {
    res.send('Free Fire v1.70.0 Server is Live');
});

// الاستجابة لجميع مسارات /live/ وتوفير بيانات الدخول الأساسية
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
    console.log(`Server is running on port ${PORT}`);
});
