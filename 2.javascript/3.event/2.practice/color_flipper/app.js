// 1. Click me 버튼 엘리먼트를 JS로 가져온다
const button = document.getElementById('btn');

// 2. 가져온 버튼에 클릭 이벤트를 부여한다
    // 이벤트를 부여하기 위한 API - addEventListener()

    // 함수를 clickHandler라는 변수에 할당
    const clickHandler = () => {
        // 버튼이 클릭되었을 때 동작시킬 로직 작성 부분
        const [red, green, blue] = getRandomNumber(0, 255); // 배열 디스트럭처링

        // 배경색을 변경하는 방법?
            // ★ JS는 HTML 엘리먼트 뿐만아니라, CSS도 조작할 수 있음
        const rgbColor = `rgb(${red}, ${green}, ${blue})`;
        document.body.style.backgroundColor = rgbColor;
        
        // TODO: rgb 텍스트 색상 및 숫자값도 변경 처리
        
    };
    // clickHandler 함수를 호출하려면??
    // console.log(clickHandler);
    // clickHandler(); // -> 변수의 이름 뒤에 소괄호를 붙여서 호출 형태로 작성
    console.log('app.js 실행됨!!');
    button.addEventListener('click', clickHandler);

// 3. 클릭 이벤트가 발생했을 경우 실행시킬 로직을 작성한다.
    // 3-1. 로직 - 배경색, RGB 텍스트의 숫자값 변경

// 랜덤값 추출
function getRandomNumber(min, max) {
    const randomRGBArray = [];

    for (let i = 0; i < 3; i++) {
        const randomNumber = Math.floor(Math.random() * ( max - min + 1)) + min;
        randomRGBArray.push(randomNumber);
    }

    return randomRGBArray;
}