import React from 'react'
import CalenderDaily from './CalendarDaily';


const Calendar = ({ todayDate, expense, onDayClick }) => {
    
    const monthList = Array.from({length: 31}, (_, i) => i+1);
    
    const y = String(todayDate.year);
    const m = String(todayDate.month).padStart(2, "0");
    const d = "01";
    const getFirstWeekCode = new Date(y-m-d).getDay();

    const gapDays = Array.from({length: getFirstWeekCode}, (_, i) => 0);

    const mergedMonth = [...gapDays, ...monthList]; //정상

    const dailys = mergedMonth.map((day) => {
        
        const key = crypto.randomUUID();
        const checkDay = (day == 0) ? " " : day;
        
        const price = expense.reduce((sum, e) => {
            if (todayDate.year === e.year && todayDate.month === e.month && day === e.day) {
                return sum + e.price;
            }
            return sum;
        }, 0);
        
        return <CalenderDaily day={checkDay} key={key} price={price === 0 ? " ": price} onClick={()=>onDayClick(todayDate.year,todayDate.month, day)}/>
    });
    
    return (
        // 배경을 연한 하늘색으로 설정
        <div className="w-full bg-[#E0F2FE] p-2 rounded-xl shadow-inner">
        <div className="w-full border-t border-l border-blue-200 rounded-lg overflow-hidden bg-white/80 backdrop-blur-sm">
            {/* 요일 헤더: 진한 파란색 포인트 */}
            <div className="grid grid-cols-7 bg-[#0083CA]">
            {['일', '월', '화', '수', '목', '금', '토'].map((d, i) => (
                <div key={d} className="py-2 text-center text-[11px] font-bold text-white border-b border-blue-300/50">
                {d}
                </div>
            ))}
            </div>
            
            {/* 날짜 그리드 */}
            <div className="grid grid-cols-7">
            {dailys}
            </div>
        </div>
        </div>
    );
}

export default Calendar
