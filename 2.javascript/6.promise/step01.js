/*promis 객체 생성
*/


const promise = new Promise(()=>{}); //생성자 함수가 바로 반환됨
console.log(promise); //비동기 처리 수행 전 promise의 상태 
//pending: 방금 약속을 맺기만 했고, 
// 아직 약속의 이행/ 실패 결과가 나오지 않은 상태 ! 
