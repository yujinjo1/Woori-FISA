// 시간을 지연시키는 함수
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// 예: 2초 지연 후 실행
(async () => {
  console.log('스크립트 시작');
  
  await delay(2000); // 2000ms = 2초 지연

  console.log('2초 후 실행되는 코드');
})();

// 이미지 URL
const imageUrl = 'https://picsum.photos/id/1020/800/450';

// 이미지 객체 생성
const img = document.createElement('img');
img.src = imageUrl;
img.alt = 'Dynamic Image from Picsum';
img.onload = () => {
    console.log('Image loaded successfully');
};
img.onerror = () => {
    console.error('Failed to load image');
};

// DOM에 추가
document.getElementById('image-container').appendChild(img);