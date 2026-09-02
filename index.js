const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.all('/live/*', (req, res) => {
    console.log(`Received request: ${req.method} ${req.url}`);
    res.json({
        status: 0,
        msg: "success",
        version: "1.70.0"
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
