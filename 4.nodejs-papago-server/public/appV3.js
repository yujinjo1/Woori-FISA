// 해야할 일 - 입력받은 텍스트를 가지고 XHR(XMLHttpRequest)를 활용하여 서버에 요청 전송
//브라우저에서 실행되는 클라이언트 코드

// 이 코드의 책임

// textarea 입력 감지

// 2초 디바운싱

// 서버(/example)로 비동기 요청

// 서버 응답을 화면에 출력

const [sourceTextArea, targetTextArea] 
    = document.getElementsByTagName('textarea');

let timerId;
sourceTextArea.addEventListener('input', (event) => {
    clearTimeout(timerId);
    
    timerId = setTimeout(() => {
        const text = event.target.value;

        // 비동기 요청 전송 코드
            // 1. XHR 객체 생성
            const xhr = new XMLHttpRequest();
            // 2. 요청 준비(URL, 전송할 데이터)
            const URL = '/example'; // localhost:3000은 생략

            const data = {
                query: text
            }
            // 직렬화
            const stringifiedData = JSON.stringify(data);

            xhr.open('POST', URL);

            // 요청 헤더에 Content-Type 추가
            xhr.setRequestHeader('Content-Type', 'application/json');
            // 3. 요청 전송
            xhr.send(stringifiedData); // 직렬화된 데이터 전달

            // 4. 응답 완료 시 결과값 확인
            xhr.onload = () => {
                // TODO: 세부 로직 작성  
                const responseData = xhr.response;
                console.log(responseData);

                // 결과 데이터를 화면에 렌더링 처리
                    // 문자열 데이터를 역직렬화
                const parsedData 
                    = JSON.parse(responseData);
                console.log(parsedData);
                
                // result 프로퍼티에 접근하여 값을 취득하고
                // 번역결과 텍스트 영역에 할당
                targetTextArea.value 
                    = parsedData.result;  
            } 
    }, 2000);
});