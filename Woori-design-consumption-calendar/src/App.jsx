import { useState } from 'react';
import { dummyData } from './mock/expenses.mock';
// import Layout from './components/layout/MainLayout';
import MainLayout from './components/layout/MainLayout';
import Calendar from './components/consumptions/Calendar';
import ExpenseModal from './components/modal/ExpenseModal';
import Header from './components/consumptions/Header';
import ShowTotalPrice from './components/consumptions/showTotalPrice';

function App() {
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const todayDate = {year: 2026, month: 1, day: 14}; //기본세팅! 

  const handleDayClick = (year, month, day) => {
    if (!day) return;

    setSelectedDate({
      year,
      month,
      day,
    });
    setOpen(true);
  };

  const dailyExpenses = dummyData.filter(item =>
    selectedDate &&
    item.year === selectedDate.year &&
    item.month === selectedDate.month &&
    item.day === selectedDate.day
  );

 const groupedDailyExpenses = Object.values(
  dailyExpenses.reduce((acc, item) => {
    const key = item.title;

    if (!acc[key]) {
      acc[key] = {
        id: key,                 // daily처럼 id
        title: item.title,
        price: 0,                // ⭐ total 대신 price
        year: item.year,
        month: item.month,
        day: item.day,
      };
    }

    acc[key].price += item.price;
    return acc;
  }, {}));

  const [date, setDate] = useState(todayDate);
    
  const changeDate = (selectedMonth) => {
      const newDate = {...date,year: selectedMonth.getFullYear(),month: selectedMonth.getMonth()+1};
      setDate(newDate);
  }

  return (
    <MainLayout>
      <div className="pl-0 pb-2">
          <Header onChange={changeDate}/>
      </div>
      
      <div className='mb-8'>
          <ShowTotalPrice dummyData={dummyData} todayDate={date}/> 
      </div>

      {/* <div className="p-4"> */}
        {/* ✅ 달력은 항상 보인다 */}
        <Calendar
          todayDate={date}
          expense={dummyData}
          onDayClick={handleDayClick}
        />

        {/* ✅ 모달은 조건부 */}
        <ExpenseModal
          isOpen={open}
          onClose={() => setOpen(false)}
          date={
            selectedDate
              ? `${selectedDate.year}.${String(selectedDate.month).padStart(2,'0')}.${selectedDate.day}`
              : ''
          }
          expenses={groupedDailyExpenses}
        />
      {/* </div> */}
    </MainLayout>
  );
}

export default App;
