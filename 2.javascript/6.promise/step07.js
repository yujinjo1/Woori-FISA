/*
    지금까지 직접 new Promise를 통해 Promise 객체를 생성했지만,
    fetch API를 사용할 경우, fetch()는 Promise를 반환함

    따라서 개발자가 직접 Promise를 생성/관리할 필요가 없음
*/

const get = (endpoint) => {
  const url = `http://localhost:4000/${endpoint}`;

  // 화살표 함수에 { }가 있으면 코드가 2줄 이상이기 때문에 return 키워드 명시
  return fetch(url)
          .then(response => response.json())
          .then(data => data);
};

// TODO: 작성 부분

/* 1단계: id로 게시글 조회 */
const getPost = (postId) => get(`posts/${postId}`);

/* 2단계: 작성자 — getPost()의 resolve를 통해 응답받은 post 객체를 getUser의 함수 파라미터인 post로 전달받아 post.userId로 사용자 조회 */
const getUser = (post) => get(`users/${post.userId}`);

/* 3단계: 결과 출력용 헬퍼 */
const printUser = (user) => console.log('작성자 상세: ', user);

// 각 메서드(getPost, getUser, printUser) 호출
getPost(1)
// resolve()의 결과데이터는 then(콜백)의 콜백함수의 인수(post)로 전달됨
//.then((post) => get(`users/${post.userId}`))
    .then(getUser)
    .then(printUser)
    .catch(console.error);