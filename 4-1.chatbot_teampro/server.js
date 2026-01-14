
import express from 'express';
import path from 'path';

const app = express();
const PORT = 3000;

// 1. 'public' 폴더 안에 있는 모든 파일을 자동으로 서버에 올립니다.
// 이제 index.html, app.js를 일일이 readFile 할 필요가 없어요!
app.use(express.static('public')); 



// lh:3000'/'로 요청하면 두 번째 인수인 콜백 함수의 로직이 동작함
app.get('/', (request, response) => {
    // 서버가 처리할 로직 작성 부분 s
    response.sendFile('index.html'); // public/index.html 응답
});

// 2. API 통신 부분
app.get('/api/check', (req, res) => {
    // res.writeHead, JSON.stringify 대신 .json() 하나면 끝!
    res.json({ message: "Express 서버와 연결 성공!" });
});

app.listen(PORT, () => {
    console.log(`Express 서버가 http://localhost:${PORT}에서 실행 중입니다.`);
});