import React from 'react'

// todayDate: {year: 2022, month: 3}

// TODO: 월 바뀔 때마다 값 업데이트하는 useState 이용  

export const ShowTotalPrice = ( {dummyData, todayDate} ) => {



    // 오늘 날짜에 해당하는 데이터만 추출
    const filteredData = dummyData.filter((item) => {
        return item.year === todayDate.year && item.month === todayDate.month
    })

    console.log(filteredData);
    

    // 더미 데이터에서 가격만 추출 
    const prices = filteredData.map((it) => it.price); 
 
    // 총 금액 계산
    const totalPrice = prices.reduce(
        (totalPrices, price) => totalPrices + price, 0,
    )

    console.log(totalPrice);
    
    return (
        <div className="flex items-baseline gap-2">
            <div className="text-gray-700">총 금액</div>
            <div className="text-[#0067AC] font-bold text-2xl">
                {totalPrice.toLocaleString()}원
            </div>
        </div>
    )
}

export default ShowTotalPrice; 