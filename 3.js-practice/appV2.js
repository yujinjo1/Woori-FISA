//사용자가 브라우저를 통해 ' 안녕;과 같은 텍스트를 입력하면 
//js에서 입력된 값을 가져다가 브라우저 콘솔에 출력 
//해야할 일- 입력받은 텍스트를 가지고 XHR를 활용하여 요청 전송 
const [sourceTextArea, targetTestArea]
    =document.getElementsByTagName('textarea');

    //1. o만 입력했을때 input이벤트가 발생
    //2. 아를 입력하면-> input이벤트가 새롭게 다시 발생
    //3. 안을 입력하면 input이벤트 또 발생 ... 

let timerId;
    sourceTextArea.addEventListener("input",(event)=>{
        clearTimeout(timerId);

       // console.log('출력됨');
    //event,target.value - 사용자의 입력값을 담은 프로퍼티 
        timerId=
        setTimeout(() => {
            console.log(event.target.value);

            //1. 비동기 요청 전송 코드 
            const xhr= new XMLHttpRequest();
            //2.요청준비
            const URL='/example'; ///TODO:변경예정
            const data={
                query: Text
            }
            xhr.open('POST',data);
            //3.요청전송
            xhr.send(data);

            //4.응답 완료 시 결과값 확인 
            xhr.onload=()=>{}; //TODO :세부로직개선     
        }, 2000);
        // 타이머 객체가 ㅇ에 대한 타이머를 세고 있음(0..1...)
        
    });

//1. js코드가 저렇게 동작하는 흐름? 간단하게 파악 
//2. '안녕'한번만 출력되도록 문제해결 

const id = setTimeout(() => console.log('1초후 실행됨'), 1000);
console.log(id);