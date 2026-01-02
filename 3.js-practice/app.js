//사용자가 브라우저를 통해 ' 안녕;과 같은 텍스트를 입력하면 
//js에서 입력된 값을 가져다가 브라우저 콘솔에 출력 
const [sourceTextArea, targetTestArea]
    =document.getElementsByTagName('textarea');

    sourceTextArea.addEventListener("input",()=>{
        console.log('출력됨');
        //event,target.value - 사용자의 입력값을 담은 프로퍼티 
        console.log(event.target.value);

        
    });

//1. js코드가 저렇게 동작하는 흐름? 간단하게 파악 
//2. '안녕'한번만 출력되도록 문제해결 




// // 1. textarea 가져오기
// const translateBox = document.getElementById("translate-box");

// // 2. input 이벤트 등록
// translateBox.addEventListener('input', () => {
//   // 3. 입력된 값 가져오기
//   const value = translateBox.value;

//   // 4. 콘솔에 출력
//   console.log(value);
// });
