

/***
 * primise 를 통해 비동기 처리 작업 수행하기 
 * -먼저 setTimeout으로 작성해보고, 이후 XHR로 변경 
 */
const executor =( resolve, rejected)=>{
//개발자가 할일은 resolve와 rejected를 활용하는것 
//1. 요청이 성공했을 경우? 
    setTimeout(() => {
        resolve('요청 성공에 따른 결과 데이터');
    }, 1000);
    
    
};
const promise = new Promise(executor); //생성자 함수가 바로 반환됨

//promise객체가 사용할 수 있는 후속처리(체이닝메서드)
//then()-> 작업이 성공했을 경우 처리할 로직 작성 부분 
//실제 작업때 이 부분을 잘 쓰면 된다. 

promise.then((response)=>{
    console.log(response);
})

//동작흐름은 
// // The callback to execute when the Promise is resolved
// resolve()에 있는 '원하는 데이터값'값이 response에 전달됨