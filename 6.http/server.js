// HTTP 헤더 실습 - Accept 헤더

import { createServer } from 'http';

const PORT = 4000;

// ------------------------------
// Accept 협상 시나리오 서버
// ------------------------------
const server = createServer((req, res) => {

    // 서버가 제공 가능한 포맷
    const SUPPORTED_TYPES = [
    "application/json",
    "text/html"
    ];

  // 요청 객체에서 메서드, URL, 헤더 정보 추출
  const { method, url, headers } = req;

  // 공통 응답 헤더 (필요 시 테스트용 수정 가능)
  res.setHeader("X-Powered-By", "Node.js Raw HTTP Server");
  res.setHeader("Content-Type", "application/json; charset=utf-8");

  // ============================================================
  // 1. HEADER 실험용 엔드포인트
  // ============================================================

  // 요청 헤더 전체 반환
  if (url === "/headers/list" && method === "GET") {
    return respondJSON(res, {
      description: "요청 헤더 echo",
      headers: headers
    });
  }

  // ============================================================
  // 2. Accept 협상 시나리오
  //    → 서버가 응답 포맷을 선택하는 로직
  // ============================================================
  if (url === "/resource" && method === "GET") {
    const acceptHeader = headers["accept"];
    const clientPrefs = parseAcceptHeader(acceptHeader);

    // 서버가 제공 가능한 포맷 중 가장 높은 q를 선택
    let selectedType = null;

    for (const pref of clientPrefs) {
      if (SUPPORTED_TYPES.includes(pref.type) || pref.type === "*/*") {
        selectedType = pref.type === "*/*"
          ? "application/json"  // */* → 기본 JSON
          : pref.type;
        break;
      }
    }

    // 어떤 것도 매칭되지 않으면 JSON 기본 포맷
    if (!selectedType) selectedType = "application/json";

    // 최종 Content-Type 설정
    res.setHeader("Content-Type", selectedType);

    // 실제 응답

    if (selectedType === "application/json") {
      return respondJSON(res, {
        scenario: "Accept 협상",
        format: "json",
        message: "JSON으로 응답됨",
        selectedType,
        acceptHeader
      });
    }

    if (selectedType === "text/html") {
      res.statusCode = 200;
      return res.end(`
        <html>
          <body>
            <h1>HTML으로 응답됨</h1>
            <p>selectedType: ${selectedType}</p>
            <p>accept: ${acceptHeader}</p>
          </body>
        </html>
      `);
    }

    if (selectedType === "application/xml") {
      res.statusCode = 200;
      return res.end(`
        <response>
          <message>XML 응답</message>
          <selectedType>${selectedType}</selectedType>
          <accept>${acceptHeader}</accept>
        </response>
      `);
    }
  }

  // ------------------------------
  // 404 기본 응답
  // ------------------------------
  respondJSON(res, { error: "Not Found", method, url }, 404);
});


// Accept 파싱 → [{ type: "...", q: 0.9 }, ...]
function parseAcceptHeader(header) {
  if (!header) return [];

  return header
    .split(",")
    .map(item => {
      const [type, ...params] = item.trim().split(";");
      let q = 1.0; // 기본 q값

      params.forEach(p => {
        const [key, value] = p.trim().split("=");
        if (key === "q") q = parseFloat(value);
      });

      return { type, q };
    })
    .sort((a, b) => b.q - a.q); // q값 높은 순 정렬
}

function respondJSON(res, obj, status = 200) {
  res.statusCode = status;
  res.end(JSON.stringify(obj, null, 2));
}

// ------------------------------
// 서버 시작
// ------------------------------
server.listen(PORT, () => {
  console.log(`Raw Node.js HTTP Server running at http://localhost:${PORT}`);
});
