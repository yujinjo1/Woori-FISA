import {sendMessage} from './api/api.js';

//채팅기능 구현
const sendButton = document.getElementById("send-chat-button");

sendButton.addEventListener('click', async () => {
    const sendChatMessage = document.getElementById("chat-bar").value;
    const chatAria = document.getElementById("chat-aria");

    const responseMessage = await sendMessage("/sendChat",sendChatMessage);
    // chatAria.createElement('a');
    const chatAriaA = document.createElement('a');
    chatAriaA.innerText = responseMessage;
    chatAria.append(chatAriaA);
});                                