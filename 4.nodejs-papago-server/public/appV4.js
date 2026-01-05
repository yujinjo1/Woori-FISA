// 해야할 일 - 언어 감지 요청 -> 언어 번역 요청 처리 수행하기

const [sourceTextArea, targetTextArea] 
    = document.getElementsByTagName('textarea');
const [sourceSelect, targetSelect] 
    = document.getElementsByTagName('select');


let timerId;
sourceTextArea.addEventListener('input', (event) => {
    clearTimeout(timerId);
    
    timerId = setTimeout(() => {
        const text = event.target.value;

        // 비동기 요청 전송 코드
            // 1. XHR 객체 생성
            const xhr = new XMLHttpRequest();
            // 2. 요청 준비(URL, 전송할 데이터)
            const URL = '/detect'; // localhost:3000은 생략

            const data = {
                query: text
            }
            // 직렬화
            const stringifiedData = JSON.stringify(data);

            xhr.open('POST', URL);

            // 요청 헤더에 Content-Type 추가
            xhr.setRequestHeader('Content-Type', 'application/json');
            // 3. 요청 전송
            xhr.send(stringifiedData);

            // 4. 응답 완료 시 결과값 확인
            
            xhr.onload = () => {
                const responseData = xhr.response;
                console.log(responseData);

                const parsedData 
                    = JSON.parse(responseData);
                console.log(parsedData);
                
                // 감지된 언어 타입을 가지고 화면에 렌더링
                sourceSelect.value 
                    = parsedData.langCode;

                    // (언어 감지 요청에 대한 후속처리)언어 번역 요청
                    // 언어감지 결과값에 접근하려면 onload 안에서만 작성할 수 있음
                    // 언어 번역 요청
                    const xhr2 = new XMLHttpRequest();
                    
                    const TRANSLATE_URL = '/translate'; // localhost:3000은 생략

                    const translate_request_data = {
                        source: parsedData.langCode,
                        target: 'en',
                        text // text: text와 같음
                    }
                    
                    // 직렬화
                    const translate_stringifiedData = JSON.stringify(translate_request_data);

                    xhr2.open('POST', TRANSLATE_URL);

                    // 요청 헤더에 Content-Type 추가
                    xhr2.setRequestHeader('Content-Type', 'application/json');
                    // 3. 요청 전송
                    xhr2.send(translate_stringifiedData);

                    // 4. 응답 완료 시 결과값 확인
                    xhr2.onload = () => {
                        const responseData = xhr2.response;

                        const parsedData 
                            = JSON.parse(responseData);
                        console.log(parsedData);

                        targetTextArea.value = parsedData.message.result.translatedText;
                        //추가 후속 처리 요청 코드가 있을 경우?? 
                    }

            }//xhr.onload 끝 

            
    }, 2000);
});