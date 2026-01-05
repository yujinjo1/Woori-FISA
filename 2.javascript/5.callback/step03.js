function a() {
  const aCallback = () => console.log('a() started');
  setTimeout(aCallback, 1000);
}
 
function b() {
  const bCallback = () => console.log('b() started');
  setTimeout(bCallback, 500);
}
 
function c() {
  const cCallback = () => console.log('c() started');
  setTimeout(cCallback, 1200);
}
 
a();
console.log('a() done');
b();
console.log('b() done');
c();
console.log('c() done');


//a,b,c 순서대로 동작하게 하려면? 
//각각의 소요시간은 네트워크 응답 시간이라고 가정할 경우 , 
// a,b,c는 각각 비동기 요청 로직인데, a,b,c순서대로 동작하게 하려면? 
//-> step04.js

