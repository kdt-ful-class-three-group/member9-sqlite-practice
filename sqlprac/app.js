const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/users');

const app = express();
const PORT = 3002;

// JSON 파싱 미들웨어
app.use(bodyParser.json());


// 사용자 라우트 사용
app.use('/api/users', userRoutes);


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});