import { detectLanguage, translateLanguage } from './api/api.js';

// 코드 리팩토링
const [sourceTextArea, targetTextArea] 
    = document.getElementsByTagName('textarea');
const [sourceSelect, targetSelect] 
    = document.getElementsByTagName('select');

// 번역하고싶은 언어의 타입 변경 이벤트
let targetLanguage = 'en';
targetSelect.addEventListener('change', (event) => {
    targetLanguage = event.target.value;
});

// 디바운스 로직 분리
let timerId;

function debounceTranslate(callback, delay) {
    if (timerId) clearTimeout(timerId);

    timerId = setTimeout(callback, delay);
}

sourceTextArea.addEventListener('input', (event) => {
    const text = event.target.value;
    
    debounceTranslate(async () => {
        if (!text.trim()) return; // 입력값이 공백일 경우

        // 1. 언어 감지 요청
        const detectedResult = await detectLanguage('/detect', text);
        console.log(detectedResult);
        
        // 2. 언어 번역 요청

        // 언어 번역 요청을 위한 페이로드 준비
        const payload = {
            source: detectedResult,
            target: targetLanguage,
            text // 프로퍼티와 value의 이름이 동일할 경우(text: text와 같음)
        }

        const data = await translateLanguage('/translate', payload);
        console.log(data);
        
        // 결과값 렌더링
        
        sourceSelect.value = data.detectedLanguage;
        targetSelect.value = data.targetLanguage;
        targetTextArea.value = data.translatedText;



    }, 2000);
});