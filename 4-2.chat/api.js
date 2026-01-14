//clova chatbot api통신
import HTTP from 'superagent';
import crypto from 'crypto';
import CryptoJS from 'crypto-js';
// import dotenv from 'dotenv';

// const CLIENT_ID = process.env.CLIENT_ID;
// const cloavaChat = "https://tk7id94793.apigw.ntruss.com/custom/v1/18581/22ace9f3ee7b45b01959146ce174ee20c424be74bd34b026289c270cfd61444b";
const cloavaChat = "https://wxf3k12v25.apigw.ntruss.com/custom/v1/18577/f1110c7fd0e69a25e77b779594847137e182b571ad34d75688bf7eb933b4f7a4";
// const cloavaChat = "https://clovachatbot.ncloud.com/api/chatbot/messenger/v1";
const CLIENT_SECRET = 'blFIcUtyc3F5bVhQVGxsemFxeEJ1UVV4cXVuUFFSWVQ=';
// const CLIENT_SECRET = 'UWt4SHhMYnRob012ek9ocG1lYVdGR2JvYmRTR1Fndm0=';

// const signatureHeader = CryptoJS.HmacSHA256(message, CLIENT_SECRET).toString(CryptoJS.enc.Hex)

function makeChatbotSignature(requestBodyString) {
    return crypto
        .createHmac('sha256', CLIENT_SECRET)
        .update(requestBodyString, 'utf8')
        .digest('base64');
}

export async function chat(reqData){

    //api문서 가이드 참고해서 작성 
    const bodyData = {
        'version': "v2",
        'timestamp': Date.now(),
        'userId': "userId",
        'bubbles': [{
            'type' : 'text',
            'data' : { 'description' : reqData.text}
        }],
        'event': "send"}

    const requestBodyString = JSON.stringify(bodyData);
    const signature = makeChatbotSignature(requestBodyString);
    try {
        const result = await HTTP
                    .post(cloavaChat)
                    .send(requestBodyString)
                    .set('Content-Type', 'application/json; charset=UTF-8')
                    .set('X-NCP-CHATBOT_SIGNATURE', signature)
        // console.log("error 확인: ", result);
        return JSON.parse(result.text);
    } catch (error) {
        console.log("error 발생");
        console.error(error);
    }
}