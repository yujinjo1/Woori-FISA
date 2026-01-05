// 콜백 함수 기본

function greeting(name) {
    console.log(`Hello ${name}`);
}

function processUserInput(name, callbackFn) {
    // 함수호출이 아니라 함수의 시그니처가 출력됨
    console.log(callbackFn); 
    
    callbackFn(name);
}

processUserInput('yoo', greeting);

// 함수 2개 구현

// 1. 쿠팡에서 사과를 기다리는 함수 waitCoupang(appleBox, callbackFn)
// 함수의 동작: '쿠팡에서 ${appleBox}가 도착했다' 출력
function waitCoupang(appleBox,callbackFn){
    console.log('쿠팡에서 $(appleBox) 가 도착했다!');

    //사과가 도착했기 때문에 옆집 아주머니에게 전달 가능 
    callbackFn();
    

}
// 2. bringItToNeighbor()
// 함수 동작: '옆집 아주머니에게 전달 완료!' 출력

// appleBox: '사과'라는 문자열 전달
waitCoupang('사과', bringItToNeighbor)