import React, { useState } from 'react'

const Counter = () => { 
    console.log('렌더링됨');
    
    // useState의 시그니처
    // const [상태로 관리할 값(변수),상태값 업데이트 함수] = useState('초기상태값');
    const [count, setCount] = useState(0);
    
    console.log(count);
    
    const clickHandler = () => {
        console.log(`count: ${count}`);
        
        const updatedValue = count + 1;
        
        setCount(updatedValue);
    }

    return (
        <div>
            <p>😁😁 {count} 개 </p>
            <button onClick={clickHandler} className='text-6xl'>❤️</button>
        </div>
    )
    
}

export default Counter