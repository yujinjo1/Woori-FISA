//Papago API만 담당하는 “기능 모듈”
// NCP(네이버 클라우드) API로 요청 처리 코드
import HTTP from "superagent";
// 1. 요청 객체 생성

// 2. 요청 준비(URL, 전송할 데이터)
const DETECT_URL = 'https://papago.apigw.ntruss.com/langs/v1/dect'

const data = {
    query: '안녕?'
}
// 직렬화
const stringifiedData = JSON.stringify(data);

const API_ID = 'w0k0mhoxcw';
const API_SECRET = 'tMUbOkTKwPTAsjw5FL8pVCwt1g178wLjgthFoBbM';

// xhr.setRequestHeader('X-NCP-APIGW-API-KEY-ID', API_ID);
// xhr.setRequestHeader('X-NCP-APIGW-API-KEY', API_SECRET);

export function detectLanguage(text,callback){
    HTTP.post(DETECT_URL)
        .send({query: text})
        
        .set('Content-Type','application/json')
        .set('X-NCP-APIGW-API-KEY-ID',API_ID)
        .set('X-NCP-APIGW-API-KEY', API_SECRET)
        .end((err,res)=>{
            if(err){
                callback(err,null);
                return;
            }
            callback(null, res.body.langCode);
        });}

export function translate(text,sourceLang, targetLang, callback){
    HTTP.post(FTRANSLATE_URL)
        .send({
            source: sourceLang,
            target: targetLang,
            text: text
            })

        .set("Content-Type", "application/json")
        .set("X-NCP-APIGW-API-KEY-ID", API_ID)
        .set("X-NCP-APIGW-API-KEY", API_SECRET)

        .end((err, res) => {
            if (err) {
        callback(err, null);
        return;
        }

        const translatedText=
            res.body.message.result.translatedText;

        callback(null, translatedText);






});

    

}



// 3. 요청 전송
