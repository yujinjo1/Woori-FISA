//서버 배포 및 클라이언트 요청수락
import {chat} from './api.js';
import express, {json} from 'express';
import cors from 'cors'; // 1. cors 임포트 추가

const app = express();
const PORT = 5000;

// 2. CORS 설정 추가 (모든 도메인으로부터의 요청을 허용)
app.use(cors());

app.use(express.static('public'));
app.use(json());

//기본 파일 호출
app.get('/', (_, response) => response.sendFile('index.html'));


//채팅 보내기
app.post('/sendChat', async (request, response) => {
    const data = request.body;
    
    const result = await chat(data);
    let resultBubbles = result.bubbles;
    const text = resultBubbles[0].data.description;
    console.log("post 요청에 의한 결과 값: ", text);
    response.send(text);
});

app.listen(PORT, () => console.log(`Express 서버가 http://localhost:${PORT} 에서 대기중`));
