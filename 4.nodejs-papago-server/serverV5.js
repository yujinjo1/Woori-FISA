import express, { json } from 'express';
import { detectLanguage, translate } from './api.js';

const app = express();
const PORT = 3000;

app.use(express.static('public'))
app.use(json());

// ↓ ------------------ API 관련 엔드포인트 코드들 

// 1. 필수 : '/'(root)경로로 요청하면 index.html을 응답하는 엔드포인트(Endpoint)
app.get('/', (_, response) => response.sendFile('index.html'));

// 2. 언어 감지
app.post('/detect', async (request, response) => {

    // 요청 객체에서 페이로드 추출
    const payload = request.body;

    // 외부 API 호출(NCP 언어감지)
    const result = await detectLanguage(payload);

    // 클라이언트에게 응답 처리
    response.send(result);
});

// 3. 언어 번역 요청
app.post('/translate', async (request, response) => {
    const payload = request.body;

    // 외부 API 호출(NCP 언어번역)
    const result = await translate(payload);
    
    // 클라이언트에게 응답 처리
    response.send(result);
    
});

// ↑ ------------------ API 관련 엔드포인트 코드들 

app.listen(PORT, () => console.log(`Express 서버가 http://localhost:${PORT} 에서 대기중`));