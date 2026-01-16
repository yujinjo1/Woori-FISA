describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:5173')
  })
})

//각 테스트 케이스 (it)이 수행되기 전에 한 번씩 실행되는 코드 (실행 전 준비 )

beforeEach(()=>{
  //페이지 접속
    cy.visit('http://localhost:5173')

})

afterEach(() => {
  console.log('자원 해제 처리'); // Cleanup 처리
})

describe('할일 등록 기능 ',()=>{

  it.skip('할일 등록 버튼을 클릭할 경우 , 할일 등록 폼 Modal이 활성화 된다.', ()=>{
 
    //테스트 코드 로직 작성 부분 

    //페이지 접속
    cy.visit('http://localhost:5173')

    //내가 고려하지 못한 부분이 어디있는지 ..
    //헤더에 버튼 데이터 가져옴! 
    cy.get('[data-cy="add-todo-button"]')
      .click();
    //->해당버튼을 마우스로 클릭 ! 

    //Modal창이 정상적으로 활성화되었는지 확인하는 방법?? 

    const expected ='할일 등록';

    cy.get('[data-cy ="todo-form-title"]')
    .should('have.text','할일 등록')

    // -> it()에 작성된 '테스트 시나리오에 대한 검증용 코드'(함수)가 작성이 되어있어야 함 .
    //ex. assert(), expect(), ... 
  });

  //it.skip ->이거는 스킵하고 넘어가라 ! 
  //it은 하나의 독자적인거라서 항상 visit해줘야 한다. ! 

   it('할 일이 등록되면 할 일 목록에 등록한 새로운 할 일이 추가되어 표시된다.', () => {
    //페이지 접속


    //할일 등록 버튼 클릭

    cy.get('[data-cy="add-todo-button"]')
    .click();

    //할일 입력 및 등록 수정
    cy.get('#title').type('실기 문제풀기');
    cy.wait(500);
    cy.get('#summary').type('실기 평가를 통과한다... ');
    cy.wait(500);

    

    //할 일 추가되었는지 확인 
    cy.get('[data-cy="process-add-or-update"]').click();
    cy.wait(1000);
    cy.contains('실기 문제 풀기').should('exit');

  





  });

})