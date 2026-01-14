import HTTP from 'superagent'

const DETECT_URL = 'https://papago.apigw.ntruss.com/langs/v1/dect'
const TRANSLATION_URL= 'https://papago.apigw.ntruss.com/nmt/v1/translation';

import dotenv from 'dotenv';
dotenv.config(); //env동작을 위한 설정 

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

/** 
 * Papago 언어 감지 외부 API
 * @param {Object} payload - 감지할 언어 텍스트, 예: { query: 'Hello' }
 * @returns {Promise<Object>} - 감지된 언어값, 예: { langCode: 'en' }
 */
export async function detectLanguage(payload) {

      const result = await HTTP
                        .post(DETECT_URL) 
                        .send(payload) 
                        .set('Content-Type', 'application/json') 
                        .set('x-ncp-apigw-api-key-id', CLIENT_ID)
                        .set('x-ncp-apigw-api-key', CLIENT_SECRET);
    return result.body;
}

export async function translate(payload) {
    // Papago API 요청
    const result = await HTTP
        .post(TRANSLATION_URL)
        .send(payload)
        .set('Content-Type', 'application/json')
        .set('x-ncp-apigw-api-key-id', CLIENT_ID)
        .set('x-ncp-apigw-api-key', CLIENT_SECRET);

    // Papago 응답 본문
    const responseDataFromPapago = result.body;

    // 필요한 데이터만 추출
    const { // JS 객체 디스트럭처링 문법
        srcLangType: detectedLanguage,
        tarLangType: targetLanguage,
        translatedText
    } = responseDataFromPapago.message.result;

    // 반환 포맷 구성
    const responseData = {
        detectedLanguage,
        targetLanguage,
        translatedText
    };

    return responseData;
}