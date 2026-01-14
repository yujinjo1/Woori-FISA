//서버에 요청 보내기
export const sendMessage = async (url, text) => {
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "text": text
            })
        });
        const resultText = await response.text();
        return resultText;

    }catch(error){
        console.error(error);
    }
}