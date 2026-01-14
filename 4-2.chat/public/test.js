
import { sendMessage } from './api/api.js'; // API 함수 가져오기

const chatBox = document.querySelector('.chat-box');
const chatBtn = document.getElementById('chatBtn');
const closeBtn = document.getElementById('close-btn');
const sendBtn = document.getElementById('sendBtn');
const userInput = document.getElementById('userInput');
const chatBody = document.querySelector('.chat-box-body');



// 1. 열기/닫기 로직 Open and close the chat
chatBtn.addEventListener('click', () => {
  chatBox.style.display = 'flex';
  chatBtn.style.display = 'none';
});
closeBtn.addEventListener('click', () => {
  chatBox.style.display = 'none';
  chatBtn.style.display = 'block';
});
// 2. 통합된 메시지 전송 로직 Send message
sendBtn.addEventListener('click', async () => {
  const text = userInput.value.trim();
  if (!text) return;

  // [내 메시지 화면 표시]
  const userMessage = document.createElement('div');
  userMessage.classList.add('message', 'user');
  userMessage.textContent = text;
  chatBody.appendChild(userMessage);
  
  userInput.value = ''; // 입력창 비우기
  chatBody.scrollTop = chatBody.scrollHeight;

  // [수정된 부분: 서버 통신 추가]
  try {
    // app.js에서 가져온 sendMessage 기능을 여기서 사용합니다.
    const responseMessage = await sendMessage("http://localhost:5000/sendChat", text);
  
  const botMessage = document.createElement('div');
  botMessage.classList.add('message', 'bot');
  botMessage.textContent = responseMessage;
  chatBody.appendChild(botMessage);
  } catch (error) {
    console.error("통신 실패:", error);
  }
  
  chatBody.scrollTop = chatBody.scrollHeight;
});
