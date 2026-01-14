import React, { useState } from 'react'; // 1. useState를 불러옵니다.

const Header = () => {
  // 2. 상태 정의 (현재 날짜와 메뉴 열림 상태)
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // 3. 영어 달 이름 배열
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // 4. 년도 리스트 (현재 기준 앞뒤로 5년씩 생성)
  const currentYear = currentDate.getFullYear();
  const years = Array.from({ length: 11 }, (_, i) => currentYear - 5 + i);

  // 5. 날짜 변경 핸들러
  const handleDateChange = (year, monthIndex) => {
    const newDate = new Date(year, monthIndex);
    setCurrentDate(newDate);
    setIsMenuOpen(false); // 선택 후 닫기
  };

  return (
    <div style={{ padding: '20px', borderBottom: '1px solid #ddd', position: 'relative' }}>
      {/* 년도와 영어 달 표시 (클릭 시 토글) */}
      <div 
        onClick={() => setIsMenuOpen(!isMenuOpen)} 
        style={{ cursor: 'pointer', fontSize: '20px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}
      >
        {currentDate.getFullYear()} {monthNames[currentDate.getMonth()]}
        <span>{isMenuOpen ? '▲' : '▼'}</span>
      </div>

      {/* 토글 버튼 클릭 시 나오는 선택 창 */}
      {isMenuOpen && (
        <div style={{
          position: 'absolute', top: '50px', left: '20px', backgroundColor: 'white',
          border: '1px solid #ccc', borderRadius: '8px', padding: '15px', zIndex: 100,
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}>
          {/* 년도 선택 부분 */}
          <div style={{ marginBottom: '10px', display: 'flex', gap: '5px', flexWrap: 'wrap', maxWidth: '300px' }}>
            {years.map(year => (
              <button 
                key={year} 
                onClick={() => handleDateChange(year, currentDate.getMonth())}
                style={{
                  padding: '5px', fontSize: '12px',
                  backgroundColor: year === currentDate.getFullYear() ? '#eee' : 'white'
                }}
              >
                {year}
              </button>
            ))}
          </div>
          
          <hr />

          {/* 달 선택 부분 */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '5px', marginTop: '10px' }}>
            {monthNames.map((month, index) => (
              <button 
                key={month} 
                onClick={() => handleDateChange(currentDate.getFullYear(), index)}
                style={{
                  padding: '10px', fontSize: '13px', cursor: 'pointer',
                  backgroundColor: index === currentDate.getMonth() ? '#007bff' : 'transparent',
                  color: index === currentDate.getMonth() ? 'white' : 'black',
                  border: '1px solid #eee', borderRadius: '4px'
                }}
              >
                {month.substring(0, 3)}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;