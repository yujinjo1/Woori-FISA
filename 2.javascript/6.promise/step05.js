/*
    setTimeout이 아닌, XHR과 Promise를 활용하여 비동기 요청 처리 수행
    
    * Promise 자체는 비동기 요청에 활용할 수도 있고, 
    다른 맥락으로 활용할 수도 있음

    여기서 실제 비동기 처리 코드는 XHR로 작성
*/

const executor = (resolve, reject) => {
    // setTimeout 대신 XHR로 변경
    const xhr = new XMLHttpRequest();
    const url = 'http://localhost:4000/users';
    xhr.open('GET', url);

    xhr.onload = () => {
        if (xhr.status === 200) { // 200 성공 시
            const data=JSON.parse(xhr.response);


            resolve(data); //resolve의 인수로 응답데이터 전달
            
        } else {
            

            reject(new Error('HTTP에러 :${xhr.status}'));//에러메시지를 reject의 인수로 전달 
        }

    }
    xhr.send();
}

const promise = new Promise(executor); //약속 증서 

promise
.then(data => console.log(data))//성공 결과에 대한 후속 처리 로직
.catch(error => console.error(error)) //실패에 대한 후속 처리 로직 