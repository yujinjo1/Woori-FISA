import React from 'react'

const CalendarDaily = ({ day, price, onClick }) => {
  if (!day || day === ' ') {
    return <div className="aspect-[3/4] border-b border-r bg-gray-50/30" />;
  }

  return (
    <div 
      onClick={onClick} 
      // aspect-[3/4]는 가로 3 : 세로 4 비율입니다. 너무 길면 [4/5]로 조정하세요.
      className="aspect-[3/4] p-1.5 border-b border-r flex flex-col justify-between hover:bg-blue-50 cursor-pointer"
    >
      {/* 날짜: 크기를 줄이고 회색톤으로 변경 */}
      <span className="text-[11px] font-medium text-gray-500">
        {day}
      </span>

      {/* 금액: 폰트 크기를 줄이고 줄바꿈 방지 */}
      {price > 0 && (
        <div className="text-right overflow-hidden">
          <p className="text-[8px] text-gray-400 scale-90 origin-right leading-none">지출</p>
          <p className="text-[10px] font-bold text-red-500 truncate">
            {price.toLocaleString()}
          </p>
        </div>
      )}
    </div>
  )
}

export default CalendarDaily
