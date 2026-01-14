

/***
 * primise 를 통해 비동기 처리 작업 수행하기 
 * -먼저 setTimeout으로 작성해보고, 이후 XHR로 변경 
 */
const executor =( resolve, rejected)=>{
//개발자가 할일은 resolve와 rejected를 활용하는것 
//2. 요청이 실패!! 했을 경우? 
    setTimeout(() => {
        rejected('실패!! 메세지');
        
    }, 1000);
    
    
};

const promise = new Promise(executor); //생성자 함수가 바로 반환됨

//방법1)

//promise객체가 사용할 수 있는 후속처리(체이닝메서드)
const afterThen = Promise.then((response)=>{ //then은 작업 처리가 성공했을 때! 
    console.log(response);
}); //then은 작업처리가 성공했을때 

console.log(afterThen);//??(Promise객체 )


//catch - 작업 처리가 실패했을때, 
afterThen.catch((error)=>{
    console.error('캐치된 에러: ', error);
})




//방법2) 별도의 변수(afterThen)를 사용하지 않고 작성 
promise
.then((response)=>{
    console.log(response);

})//Promise 객체 반환
.catch((error)=> {
    console.error('캐치된 에러: ',error);
})//Promise객체 반환
