//async await를 이용하여 가독성 높이기 

// async await를 활용하여 가독성 높이기

const get = (endpoint) =>
  new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const url = `http://localhost:4000/${endpoint}`;   // ← posts·users 경로만 바뀜
    xhr.open('GET', url);

    xhr.onload = () => { 
      if (xhr.status === 200) {
        const data = JSON.parse(xhr.response);
        resolve(data);
      } else {
        reject(new Error(`HTTP 오류: ${xhr.status}`));
      }
    };

    xhr.onerror = () => {
      reject(new Error('네트워크 오류: 서버 연결 실패'));
    };

    xhr.send();
  });

/* 1단계: id로 게시글 조회 */
const getPost = (postId) => get(`posts/${postId}`);

/* 2단계: 작성자 — getPost()의 resolve를 통해 응답받은 post 객체를 getUser의 함수 파라미터인 post로 전달받아 post.userId로 사용자 조회 */
const getUser = (post) => get(`users/${post.userId}`);

/* 3단계: 결과 출력용 헬퍼 */
const printUser = (user) => console.log('작성자 상세:', user);

//async /await 활용하여 작성 
async function findUser(){  //async의미 == findUser()는 비동기 함수이다 

    try {
        const post = await getPost(1);  //일단 promise 반환! 
        console.log(post);  //이행되지 않은 post 객체가 있다 
        const user = await getUser(post);
        printUser(user);
    } catch (error) {
        console.error('실패: ', error);//한 곳에서 처리 가능

    }
}
console.log('1');
findUser();
console.log('2');


//실행결과 1,2 결과 데이터 순으로 출력됨. 

