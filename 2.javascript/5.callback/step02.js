function a(calalbackFn) {
    
    setTimeout(() => {
        console.log('a() is called'); 
        calalbackFn(); 
    }, 1000);
}

const aCallback = () => console.log('a() is done');
a(aCallback);

// /=>익명함수 
// a is called가 먼저 출력되고, a is done이 출력되려면?
// step02.js에 작성 후 테스트


// function a(calalbackFn) {
//     // 2번 라인에서 내부적으로 callbackFn = aCallback;이 초기화됨

//     // setTimeout과 onload가 비동기 처리 관점에서 같은 맥락
//     setTimeout(() => {
//         console.log('a() is called'); // 언어 감지 요청 처리
//         calalbackFn(); // 언어 번역 요청 처리
//     }, 1000);
// }

// const aCallback = () => console.log('a() is done');
// a(aCallback);
// // a is called가 먼저 출력되고, a is done이 출력되려면?
// // step02.js에 작성 후 테스트