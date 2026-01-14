import express from 'express';
const router = express.Router();

// 통신 테스트용 경로: http://localhost:3000/api/check
router.get('/check', (req, res) => {
    res.json({ message: "API 연결 성공!" });
});

// 챗봇용 경로: http://localhost:3000/api/chat
router.post('/chat', async (req, res) => {
    const { message } = req.body;



    // 여기서 나중에 외부 AI(Gemini, GPT 등)와 통신하면 됩니다.
    res.json({ reply: `당신의 메시지: "${message}"를 서버가 잘 받았습니다.` });
});

export default router;