 // HTTP 헤더 실습 - Content-Type 헤더
 //서버가 결과적으로 응답할 때 사용된 실제 포맷 
 //클라이언트에서는 해당 포맷을 참고하여 적절한 파싱/렌더링 처리를 수행함. 
 

import { createServer } from 'http';

const PORT = 4000;

// ------------------------------
// Content-Type 시나리오 서버
// ------------------------------
const server = createServer((req, res) => {
  const { method, url, headers } = req;

  res.setHeader("X-Powered-By", "Node.js Raw HTTP Server");

  // ============================================================
  // 1) Content-Type 시나리오 테스트
  //    → 요청 body의 실제 타입을 서버가 어떻게 해석하는지 확인
  // ============================================================
  if (url === "/content-type/analyze" && method === "POST") {
    const requestContentType = headers["content-type"];

    collectBody(req, body => {
      respondJSON(res, {
        scenario: "Content-Type 분석",
        description:
          "클라이언트가 전송한 요청 Content-Type과 요청 데이터 확인",
        requestContentType,
        parsedBody: body
      });
    });
    return;
  }

  // ============================================================
  // 2) HTML 문서를 text/plain 으로 응답하여 브라우저 렌더링을 깨뜨리는 테스트
  // ============================================================
  if (url === "/wrong-content-type" && method === "GET") {

    // 실제 HTML을 보낼 건데, Content-Type은 의도적으로 text/plain으로 설정
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain; charset=utf-8");

    return res.end(`
<html>
  <head><title>잘못된 Content-Type 테스트</title></head>
  <body>
    <h1>이 HTML은 브라우저에서 렌더링되지 않음</h1>
    <p>서버가 Content-Type을 text/plain으로 설정했기 때문</p>
  </body>
</html>
    `.trim());
  }

  // ============================================================
  // 3) 정상 렌더링 비교용
  // ============================================================
  if (url === "/correct-content-type" && method === "GET") {

    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html; charset=utf-8");

    return res.end(`
<html>
  <head><title>정상 HTML</title></head>
  <body>
    <h1>이 HTML은 브라우저에서 정상적으로 렌더링됨</h1>
  </body>
</html>
    `.trim());
  }


  // ============================================================
  // 4) Content-Type 헤더를 아예 생략했을 때 브라우저가 어떻게 동작하는지 테스트
  // ============================================================
if (url === "/no-content-type" && method === "GET") {

  res.statusCode = 200;

  return res.end(`
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Content-Type 미설정 테스트</title>
  </head>
  <body>
    <h1>Content-Type 헤더 없음</h1>
    <p>브라우저가 MIME 스니핑을 통해 HTML로 해석하지만, meta charset을 통해 UTF-8로 렌더링되도록 설정함</p>
  </body>
</html>
  `.trim());
}


  // ----------------------------
  // 404
  // ----------------------------
  respondJSON(res, { error: "Not Found", method, url }, 404);
});


// ------------------------------
// Body 수집
// ------------------------------
function collectBody(req, callback) {
  let body = "";
  req.on("data", chunk => (body += chunk.toString()));
  req.on("end", () => {
    try {
      const parsed = JSON.parse(body || "{}");
      callback(parsed);
    } catch {
      callback(body);
    }
  });
}

// ------------------------------
// JSON 응답
// ------------------------------
function respondJSON(res, obj, status = 200) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(obj, null, 2));
}

// ------------------------------
// 서버 시작
// ------------------------------
server.listen(PORT, () => {
  console.log(`server-3.js running at http://localhost:${PORT}`);
});
