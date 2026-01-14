

/***
 * primise 객체의 함수로 전달할 콜백 함수? 
 * -> executor 콜백, Promise(약속)에 대한 성공/ 실패 여부에 따른 처리 콜백 
 * 
 * executor함수 
 * -약속이 이행되면 (요청이 성공) 내부적으로 resolve()가 호출됨. 
 * -약속이 실패하면(요청 실패)내부적으로 rejected()가 호출됨. 
 * 
 * resolve 와 rejected 라는 함수는 executor()의 인수로 전달되는 콜백 . 
 * 내부 코드가 자동으로 넣어준다. ! 
 */
const executor =( resolve, rejected)=>{
//개발자가 할일은 resolve와 rejected를 활용하는것 
//1. 요청이 성공했을 경우? 
    resolve('요청 성공에 따른 결과 데이터');
    //2. 요청이 실패했을 경우? 
    rejected('요청 실패에 따른 에러 메시지');
};
const promise = new Promise(()=>{}); //생성자 함수가 바로 반환됨
console.log(promise);