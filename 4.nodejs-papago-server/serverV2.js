// Express.js라는 웹 서버 개발용 프레임워크를 활용하여 보다 추상화된 코드로 서버 구현
//프로젝트의 “진짜 서버”

// 이 서버가 하는 일

// 브라우저 요청 받음

// /example로 들어온 텍스트 처리

// api.js에 있는 Papago 언어 감지 기능 호출

// 결과(ko, en)를 브라우저에 반환

import express,{json} from 'express';
import { detectLanguage } from './api.js';

const app = express();

// console.log(app); // express 모듈 객체를 출력(null이 아닌지 확인 용도)

const PORT = 3000;

// 정적 리소스 처리하기(https://expressjs.com/ko/starter/static-files.html)
app.use(express.static('public')) // public 폴더를 정적 리소스가 위치한 폴더로 지정

//미들웨어: 역직렬화 모듈 추가 
app.use(json());


// lh:3000'/'로 요청하면 두 번째 인수인 콜백 함수의 로직이 동작함
app.get('/', (request, response) => {
    // 서버가 처리할 로직 작성 부분 s
    response.sendFile('index.html'); // public/index.html 응답
});

// 클라이언트(브라우저)에서 전달한 텍스트(ex. '안녕')를 전달받아
// 응답 데이터로 'Hello'를 응답하는 핸들러
app.post('/example', async(request, response) => {

    const text = request.body.query;
    detectLanguage(text, (error, langCode) => {
    if (error) {
      console.error(error);
      response.status(500).json({ result: 'error' });
      return;
    }

    console.log('감지된 언어 코드:', langCode);
    response.json({
        result:langCode
    });
});

});
// 서버 실행
app.listen(PORT, () => console.log(`Express 서버가 http://localhost:${PORT} 에서 대기중`));

