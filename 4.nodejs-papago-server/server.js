//기본 서버 연습용 코드”
console.log('Hello Node!');

//node.js 내장 모듈을 활용하여 간단하게 서버 생성 

import http from 'http';//http모듈

const server = http.createServer((request, response) => {
    //                           응답, 요청 
    if (request.url ==='/'){
        //응답객체를 통해 Hello World 문자열 데이터 응답 

        response.end('Hello');
    }else if(request.url==='/bye'){
        response.end('Bye!!');
    }

});
const PORT = 3000; // 포트 번호

server.listen(PORT, () => console.log(`서버가 http://localhost:${PORT}에서 실행 대기 중입니다`));