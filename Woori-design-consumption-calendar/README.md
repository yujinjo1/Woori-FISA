# 개요 
- 우리에게 가장 친숙한 시각적 도구인 달력 인터페이스를 채택하여, 시간적 맥락 위해서 소비자가 언제 어디서 얼마나 소비를 했는지에 대한 행동 패턴을 한눈에 인지할 수 있다.

- 기존의 금융 어플리케이션에서 제공하는 달력 인턴페이스를 사용할 경우 하단의 리스트를 추가하면서 달력 인터페이스가 한 주 단위로 간소화 된다.<br>
만약 사용자가 다른 주의 날짜의 세부 내역을 확인하려한다면 사용내역 리스트의 최상단 내용까지 이동해야하는 불편함이있다.<br>
달력 인터페이스의 변경 없이 Modal을 통해 세부 내역을 확인하고 한 번의 터치(클릭)로 날짜를 변경할 수 있게하여 기존 인터페이스의 불편함을 해소 시킨다.

# npm Install
https://www.npmjs.com/package/consumption-calendar-testing

```text

npm i consumption-calendar-testing

*App.jsx
import ConsumptionCalendar from 'consumption-calendar-testing'
import 'consumption-calendar-testing/dist/consumption-calendar-testing.css'

function App() {
  return (
    <ConsumptionCalendar />
  )
}

```
## 💡 기획 의도: 왜 달력 UI인가?
- **시각적 맥락화**: 단순히 숫자를 나열하는 리스트 방식에서 벗어나, 시간의 흐름에 따른 소비 데이터를 시각화하여 지출 습관 교정을 유도합니다.
- **접근성 극대화**: 남녀노소 누구에게나 익숙한 그리드 형태의 달력 UI를 채택하여 사용자의 학습 비용을 최소화했습니다.
- **정보의 계층화**: 달력에서는 '일별 합계'를, 모달(Modal)에서는 '상세 내역'을 보여줌으로써 정보의 과부하를 방지하고 체계적인 정보를 전달합니다.

---
<p align-'center'>
<img width="300" height="auto" alt="스크린샷 2026-01-15 084952" src="https://github.com/user-attachments/assets/8c9cc59e-fa32-45a8-8965-3544f3555092" />
<img width="300" height="auto" alt="스크린샷 2026-01-15 084935" src="https://github.com/user-attachments/assets/9089babb-0926-4da6-bdbb-a8a08c5bfa93" />
<img width="300" height="auto" alt="스크린샷 2026-01-15 084914" src="https://github.com/user-attachments/assets/ed008b98-6fbd-4b32-bc56-f1eb09375b68" />
</p>

![실행영상](https://github.com/user-attachments/assets/083ecb40-d64b-4317-933e-aca34d7fe414)

## 🚀 주요 기능 (Features) 

### 1. 🏗️ Main & Layout: 시스템 아키텍처 및 전역 설계
* **컴포넌트 기반 설계**: `ui/`, `layouts/`, `components/`로 역할을 분리하여 확장성과 유지보수성을 고려한 구조 설계.
* **상태 동기화**: `useState`를 활용해 메인 페이지와 헤더의 날짜 상태를 연동, 날짜 변경 시 하위 컴포넌트 데이터가 즉각 반영되도록 구현.
* **디자인 시스템**: 각 요소의 공백 및 레이아웃 가이드를 수립하여 서비스 전체의 UI 통일성 확보.

### 2. 🔝 Header: 데이터 요약 및 컨트롤러
* **동적 날짜 표시**: 사용자가 선택한 연/월을 실시간으로 렌더링.
* **지출 합계 로직**: 해당 월의 소비 데이터를 추적하여 총액을 산출하고 총 금액 표시 영역에 반영.
* **UI 예외 처리**: 총액이 0원일 경우 화면의 간결함을 위해 금액 표시를 생략하는 조건부 렌더링 적용.

### 3. 📅 Calendar: 일별 데이터 시각화
* **그리드 레이아웃**: 요일과 날짜를 계산하여 배치하고, 각 날짜를 상호작용 가능한 버튼 형태로 구현.
* **소비 패턴 시각화**: 날짜별 지출액을 달력 위에 직접 노출하여 별도의 클릭 없이도 월간 소비 흐름 파악 가능.
* **상세 내역 연결**: Portal을 활용한 모달 시스템과 연결하여, 날짜 클릭 시 해당 일의 상세 지출 정보 전달.

### 4. 팝업 Modal: React Portal 기반 상세 정보 창
* **Portal UI 구현**: DOM의 계층 구조를 탈피하여 메인 레이아웃의 간섭 없이 독립적으로 렌더링되는 모달 시스템 구축.
* **이모티콘 매핑**: 카테고리(식당, 카페, 교통 등)에 맞는 이모지(🍚, ☕, 🚋)를 더미 데이터 키값과 매칭하여 자동 표시.
* **지출 리스트 상세화**: 선택된 날짜의 항목명, 금액, 결제 시간 등을 리스트 형태로 정렬하여 제공.

---
## 📁 프로젝트 구조 (Project Structure)

```text
src/
 ┣ components/  # 도메인별 핵심 컴포넌트
 ┣ ui/          # 재사용 가능한 범용 UI 요소 (Modal Portal 등)
 ┣ layouts/     # 전체 페이지 레이아웃 프레임
 ┣ constants/   # 더미 데이터 및 이모지 매핑 상수
 ┣ utils/       # 금액 계산 및 날짜 포맷팅 유틸 함수
 ┗ contexts/    # 전역 상태 관리를 위한 Context

```
# 개선 사항

## 사용자 편의성

- dummyData
    - 사용자 커스텀 데이터가 아닌, 무조건 dummyData만 사용하게 되어있다.
        - 사용자의 data를 입력으로 받도록 수정한다.
        - 아무 데이터가 들어오지 않으면 개발 환경에서 사용한 dummyData가 default로 들어가도록 수정한다.
- 아이콘으로 보기
    - 일별 금액이 아닌, 아이콘으로도 볼 수 있는 on/off 설정을 추가한다.

--- 

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
