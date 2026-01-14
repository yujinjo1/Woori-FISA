console.log('Hello!');

/**
 * DOM Parser
 * HTML문자열을 DOM Tree로 변환해주는 역할. 
*/


const domParser = new DOMParser();

domParser.parseFromString('<div class="main">hello</div>', 'text/html');

//돔의 구조가 뭐지?? 이렇게 하면 어떤 변화가 있는건지 이해가 잘 안된다.. 

console.log(result);