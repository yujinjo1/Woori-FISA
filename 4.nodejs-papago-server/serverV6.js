// openssl을 통한 자체 간이 인증서를 통한 HTTPS 연결 설정 실습

import express, { json } from 'express';
import https from 'https';
import fs from 'fs';

import { detectLanguage, translate } from './api.js';

const app = express();
const port = 4000;

/**
 * TLS 설정
 * - 이미 server.key / server.crt 파일이 존재한다고 가정
 */
const httpsOptions = {
  key: fs.readFileSync('./keys/server.key'),
  cert: fs.readFileSync('./keys/server.crt'),
  secureProtocol: 'TLSv1_2_method'
};

// --------------------
// Express 미들웨어
// --------------------
app.use(express.static('public'));
app.use(json());

// --------------------
// 라우팅
// --------------------
app.get('/', (request, response) => {
  response.sendFile('index.html');
});

app.post('/detect', async (request, response) => {
  const payload = request.body;

  const result = await detectLanguage(payload);
  response.send(result);
});

app.post('/translate', async (request, response) => {
  const payload = request.body;

  const result = await translate(payload);
  response.send(result);
});

// --------------------
// HTTPS 서버 실행
// 주의할점!! - 여기서는 간소화를 위해 4000으로 실행하지만, 현실에서 HTTPS는 443포트로 실행됨
// --------------------
https.createServer(httpsOptions, app).listen(port, () => {
  console.log(`HTTPS Express 서버 실행 중: https://localhost:${port}`);
});
