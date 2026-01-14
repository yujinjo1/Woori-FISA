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