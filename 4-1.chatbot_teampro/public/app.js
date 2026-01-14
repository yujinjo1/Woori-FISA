const checkBtn = document.getElementById('checkBtn');

checkBtn.addEventListener('click', () => {
    console.log("버튼이 눌렸어요! 서버로 출발합니다.");
    fetch('/api/check')
        .then(res => res.json())
        .then(data => console.log("서버의 대답:", data.message))
        .catch(err => console.error("가다가 사고 났어요:", err));
});

