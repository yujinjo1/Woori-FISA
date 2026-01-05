import express,{json} from 'express';
import { detectLanguage } from './api.js';
import HTTP from "superagent";

const app = express();

// console.log(app); // express 모듈 객체를 출력(null이 아닌지 확인 용도)

const PORT = 3000;

// 정적 리소스 처리하기(https://expressjs.com/ko/starter/static-files.html)
app.use(express.static('public')) // public 폴더를 정적 리소스가 위치한 폴더로 지정


app.use(json());


// lh:3000'/'로 요청하면 두 번째 인수인 콜백 함수의 로직이 동작함
app.get('/', (request, response) => {
    // 서버가 처리할 로직 작성 부분 s
    response.sendFile('index.html'); // public/index.html 응답
});

const API_ID = 'w0k0mhoxcw';
const API_SECRET = 'tMUbOkTKwPTAsjw5FL8pVCwt1g178wLjgthFoBbM';
const DETECT_URL = 'https://papago.apigw.ntruss.com/langs/v1/dect';
const TRANSLATE_URL= 'https://papago.apigw.ntruss.com/nmt/v1/translation';

app.post('/detect', (request, response) => {
    
    // NCP(외부 API)로 요청
    HTTP.post(DETECT_URL) 
        .send(request.body)//파라미터를 body로 변환  
        .set('Content-Type', 'application/json') 
        .set('X-NCP-APIGW-API-KEY-ID', API_ID)
        .set('X-NCP-APIGW-API-KEY', API_SECRET)
        .end((error, result) => {
            if (result.statusCode === 200) {
                const responseFromNCP = result.body; // NCP로부터 받은 결과데이터
                response.send(responseFromNCP); // 클라이언트(브라우저)로 응답
            } else {
                console.error(error);
            }
           
        });
});

app.post('/trans', (request, response) => {
    
    // NCP(외부 API)로 요청
    HTTP.post(DETECT_URL) 
        .send(request.body)//파라미터를 body로 변환  
        .set('Content-Type', 'application/json') 
        .set('X-NCP-APIGW-API-KEY-ID', API_ID)
        .set('X-NCP-APIGW-API-KEY', API_SECRET)
        .end((error, result) => {
            if (result.statusCode === 200) {
                const responseFromNCP = result.body; // NCP로부터 받은 결과데이터
                response.send(responseFromNCP); // 클라이언트(브라우저)로 응답
            } else {
                console.error(error);
            }
           
        });
});

// 서버 실행
app.listen(PORT, () => console.log(`Express 서버가 http://localhost:${PORT} 에서 대기중`));