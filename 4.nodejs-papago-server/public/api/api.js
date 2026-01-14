// 언어 감지 요청 기능을 수행하는 함수
export const detectLanguage = async (url, text) => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: text
            })
        });

        const data = await response.json();
        return data.langCode;

    } catch (error) {
        console.error('언어 감지 요청 실패:', error);
        return null;
    }
};

// 언어 번역 요청 기능을 수행하는 함수
export const translateLanguage = async (url, payload) => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        const data = await response.json();
        return data;

    } catch (error) {
        console.error('번역 요청 실패:', error);
        return null;
    }
};