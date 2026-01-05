function a() {
    //a()함수 안에 인수 없음 

    setTimeout(()=>console.log('a() called'),1000);//1초! 

}

a();
console.log('a() is done');

//a is called 가 먼저 출력되고 , a is done이 출력되려면? 
//step02.js 에 작성 후 테스트 

