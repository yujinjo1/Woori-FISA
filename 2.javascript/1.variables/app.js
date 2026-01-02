console.log('app.js 실행됨!!');

// while (true);

/**
 * JS 변수의 종류
 * var, let, const
 * 
 * 변수를 선언, 초기화
 * 
 * 선언: oo이라는 이름의 변수를 사용하겟다고 JS 런타임 or 실행 컨텍스트에 명시
 * ex) var a;
 * 
 * 초기화: a라는 변수에 내가 원하는 값을 저장, 할당(초기화)
 * a = 5; // 할당 연산자(=)를 사용하여 5를 a에 초기화
 */

console.log(a);
var a = 5; // 변수 호이스팅(hoisting)
// -> var는 사용하지 않음

// 변수(Variable) - let 키워드 사용
let userName = 5; // '(Single Quote), "(Double Quote) 둘 다 사용 가능
// camelCase 준수(), 첫 번째 글자는 소문자, 두 번째 음절부터는 대문자로시작 
// userAdressName
console.log(userName); // Yoo

let comment = "let's go?";

// 변수는 값(Value)을 재할당할 수 있음
// 재할당 시에는 키워드는 생략하고, 변수의 이름만 다시 불러와서 할당하면 됨
userName = 'Kim';

// 상수(Constant)
const allUsers = 5;
allUsers = 10; // caught TypeError: Assignment to constant variable.
// 상수에 재할당 할 수 없다

// ★ 기본적으로 const로 사용하다가, 값의 변경이 필요할 것 같으면 let으로 변경한다.
const PI = 3.141592;

//변수는 일단 콘스트로 쓰기, 일단 실행해보다가 let으로 키워드만 바꿀 수 있음. 
//값이 변경될 여지를 최대한 줄여놓자! 값변경 최소로! 
