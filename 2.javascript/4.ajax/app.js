// 1. 생성자 함수를 통해 XMLHttpRequest 인스턴스(객체) 생성
//-> 비동기 요청을 수행하는 api객체 
const xhr = new XMLHttpRequest();

console.log(xhr);

//2. 요청을 준비하는 코드 작성 
const url = "https://jsonplaceholder.typicode.com/users/1";

//* 특정 라인, 범위 선택 단축키!- Alt+ 방향키 ->,<-


// 3. 요청 준비(open(method, url, async, ..))
xhr.open("GET",url);

xhr.send();


// 4. 요청 실제 전송
xhr.onload = () => {
    if (xhr.readyState === xhr.DONE && xhr.status === 200) {
        const responseData = xhr.responseText; // responseText: 서버로부터 받은 응답 데이터
        const result = JSON.parse(responseData); // JSON 역직렬화
        console.log(result); 
    }
}