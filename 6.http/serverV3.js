// 쿠키/세션 기반 인증 프로세스 이해하기

import { createServer } from "http";
import crypto from "crypto";

const PORT = 4000;
const SESSION_TTL = 60 * 3000; // 1분

// ------------------------------
// 1) In-memory User DB (샘플 계정)
// ------------------------------
const USERS = [
  { id: 1, username: "yoo", password: "1234" },
  { id: 2, username: "kang", password: "1234" },
  { id: 3, username: "yoon", password: "1234" }
];

// ------------------------------
// 2) In-memory Session Store
// ------------------------------
const sessionStore = new Map(); // sessionId → sessionData

// ------------------------------
// 유틸: 랜덤 sessionId 생성
// ------------------------------
function generateSessionId() {
  return crypto.randomBytes(16).toString("hex");
}

// ------------------------------
// 유틸: 쿠키 파싱
// ------------------------------
function parseCookies(cookieHeader = "") {
  const cookies = {};
  cookieHeader.split(";").forEach(pair => {
    const [key, value] = pair.trim().split("=");
    if (key) cookies[key] = value;
  });
  return cookies;
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
// Body 수집
// ------------------------------
function collectBody(req, callback) {
  let body = "";
  req.on("data", chunk => (body += chunk.toString()));
  req.on("end", () => {
    try {
      const parsed = JSON.parse(body || "{}");
      callback(parsed);
    } catch (e) {
      callback(body);
    }
  });
}

// ------------------------------
// 서버 구현
// ------------------------------
const server = createServer((req, res) => {
  const { method, url, headers } = req;
  res.setHeader("X-Powered-By", "Node.js Raw HTTP Server");

  const cookies = parseCookies(headers.cookie);

  // ============================================================
  // 1) 로그인
  // ============================================================
  if (url === "/login" && method === "POST") {
    collectBody(req, body => {
      const { username, password } = body;

      const user = USERS.find(
        u => u.username === username && u.password === password
      );

      if (!user) {
        return respondJSON(
          res,
          { message: "유효하지 않은 자격증명 정보입니다.(ID/PW)" },
          401
        );
      }

      // 이미 로그인된 사용자 체크
      let foundSessionId = null;
      for (const [sid, sessionInfo] of sessionStore.entries()) {
        if (sessionInfo.username === user.username) {
          foundSessionId = sid;
          break;
        }
      }

      if (foundSessionId) {
        return respondJSON(res, {
          message: "이미 로그인 된 상태입니다.",
          existingSessionId: foundSessionId
        });
      }

      // 신규 세션 생성
      const sessionId = generateSessionId();
      const now = Date.now();

      sessionStore.set(sessionId, {
        userId: user.id,
        username: user.username,
        createdAt: now,
        expiresAt: now + SESSION_TTL
      });

      // (로그 확인용) 현재 세션 저장소에 생성된 세션ID 조회
      console.log("=== 현재 sessionStore 전체 ===");
        for (const [sid, data] of sessionStore.entries()) {
        console.log(`세션ID: ${sid}, 세션값:`, data);
        
        }

      res.setHeader(
        "Set-Cookie",
        `sessionId=${sessionId}; HttpOnly; Path=/`
      );

      return respondJSON(res, {
        userId: user.id,
        message: "로그인 성공!",
        sessionId
      });
    });

    return;
  }

  // ============================================================
  // 2) 내 사용자 정보 조회 (Session 기반 인증)
  // ============================================================
  if (url === "/userinfo" && method === "GET") {
    const sessionId = cookies.sessionId;

    if (!sessionId) {
      return respondJSON(
        res,
        { message: "인증 정보가 없습니다. 로그인 필요" },
        401
      );
    }

    const session = sessionStore.get(sessionId);

    if (!session) {
      return respondJSON(
        res,
        { message: "유효하지 않은 세션입니다." },
        401
      );
    }

    // 세션 만료 검사
    if (Date.now() > session.expiresAt) {
      sessionStore.delete(sessionId);
      return respondJSON(
        res,
        { message: "세션이 만료되었습니다. 다시 로그인해주세요." },
        401
      );
    }

    return respondJSON(res, {
      loggedIn: true,
      user: {
        userId: session.userId,
        username: session.username,
        createdAt: session.createdAt,
        expiresAt: session.expiresAt
      }
    });
  }

  // ============================================================
  // 3) 로그아웃 (Session 기반)
  // ============================================================
  if (url === "/logout" && method === "POST") {
    const sessionId = cookies.sessionId;

    if (!sessionId) {
      return respondJSON(
        res,
        { message: "로그아웃할 세션이 없습니다. (쿠키 없음)" },
        401
      );
    }

    const session = sessionStore.get(sessionId);

    if (!session) {
      return respondJSON(
        res,
        { message: "유효하지 않거나 이미 만료된 세션입니다." },
        401
      );
    }

    // 세션 만료 검사
    if (Date.now() > session.expiresAt) {
      sessionStore.delete(sessionId);
      return respondJSON(
        res,
        { message: "세션이 이미 만료되었습니다." },
        401
      );
    }

    sessionStore.delete(sessionId);

    res.setHeader(
      "Set-Cookie",
      "sessionId=; Max-Age=0; HttpOnly; Path=/"
    );

    return respondJSON(res, {
      message: "정상적으로 로그아웃 되었습니다."
    });
  }

  // ============================================================
  // 4) 전체 세션 목록 조회 (관리자용)
  // ============================================================
  if (url === "/admin/sessions" && method === "GET") {
    const allSessions = Array.from(sessionStore.entries()).map(
      ([sessionId, data]) => ({
        sessionId,
        data
      })
    );

    return respondJSON(res, {
      scenario: "전체 세션 조회",
      description: "현재 서버 메모리에 저장된 모든 로그인 세션 목록",
      count: allSessions.length,
      sessions: allSessions
    });
  }

  // ============================================================
  // 404
  // ============================================================
  respondJSON(res, { error: "Not Found", url, method }, 404);
});

// ------------------------------
// 서버 시작
// ------------------------------
server.listen(PORT, () => {
  console.log(`server-session.js running at http://localhost:${PORT}`);
});
