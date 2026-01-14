//get 유틸함수도 제거하고, fetch만 가지고 요청 수행하는 코드 
/*
    지금까지 직접 new Promise를 통해 Promise 객체를 생성했지만,
    fetch API를 사용할 경우, fetch()는 Promise를 반환함

    따라서 개발자가 직접 Promise를 생성/관리할 필요가 없음
*/

// get 유틸함수도 제거하고, fetch만 가지고 요청 수행하는 코드

fetch('http://localhost:4000/posts/1')
.then(response => response.json())
.then(post => fetch(`http://localhost:4000/users/${post.userId}`))
.then(response => response.json())
.then(userDetail => console.log(userDetail))
.catch(console.error);

//catch는 마지막에 
//액시오스 AXIOS 라이브러리를 사용해서 쓸 수도 있다!  메소드 만들어 놓은 라이브러리 


