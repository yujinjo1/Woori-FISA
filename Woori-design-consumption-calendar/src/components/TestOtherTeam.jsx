// src/components/TestOtherTeam.jsx
import React from 'react';
// 1. 상대팀 컴포넌트 임포트 (이름은 상대팀이 export한 이름을 써야함)
import { SomeComponent } from '02_woori-component'; 
// 2. CSS가 있다면 임포트
import '02_woori-component/dist/style.css'; 

const TestOtherTeam = () => {
  return (
    <div style={{ padding: '20px', border: '1px solid red' }}>
      <h2>상대 팀 컴포넌트 테스트 영역</h2>
      <SomeComponent />
    </div>
  );
};

export default TestOtherTeam;