// try{
//     a++;
// }catch(error){
//     //catch 블럭으로 error가 잡힘 
//     console.error('캐치한 에러: ${error}');

// }

try{ //setTimeout()의 콜백함수를 호출한 호출자(caller)는 setTimeout이 아님. 스택에 있는애가 아니라 안잡힘.
    //결정권이 없다는건가? 큐에 등록하고 끝남. 비동기 함수니까 그 라인 실행하고 끝남. 그러면 에러 코드로 안가고 그 밑에 try 함수 밖에 있는거 실행. 
    // try 함수는 끝난거임. 콜백 나중에 함. 
    setTimeout(() => {   
        a++;
    }, 1000);
}catch(error){

    console.error('캐치한 에러: ${error}');
}
console.log('try 밖');
