// DOM 객체 출력
console.log(document);
// document도 JS 객체로 볼 수 있음
console.dir(document); // 객체의 프로퍼티 정보 조회
// JS의 객체는 프로퍼티로 구성되어 있음
// ex. URL: 'http://~~"
// URL은 key, 'http://~'는 value

// DOM 조작
const h1 = document.querySelector('h1');
console.log(h1); // html에서 가져온 엘리먼트 노드
// dir로 객체 형태로 조회할 수 있음
console.dir(h1); 
console.log(typeof h1); // JS Object 타입

// -----------------------------------------------
// DOM 조작 방법

// 가독성 측면에서 사용 권장
const h1Tag = document.getElementById('main-title');
console.dir(h1Tag.innerText);

const liList = document.getElementsByClassName('list-item');
console.log([1, 2, 3], typeof [1, 2, 3]);
console.log(liList); // 배열 형태로 가져옴

console.log(document.querySelector('ul li:first-of-type'));
// querySelectAll(); -> 전체 선택해서 가져오기