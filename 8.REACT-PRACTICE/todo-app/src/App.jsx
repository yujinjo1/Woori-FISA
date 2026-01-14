import { useState } from "react";
import TodoBody from "./components/todos/TodoBody"
import TodoHeader from "./components/todos/TodoHeader"
import DefaultLayout from "./layouts/DefaultLayout"

// import Counter from "./layouts/Counter"
// import KakaoBack from "./layouts/KakaoBack"
// import KakaoHeader from "./layouts/KakaoHeader"

// Todos 더미데이터
const dummyTodos = [
  {
    id: 1,
    title: 'React 공부',
    summary: 'React를 공부한다.',
    category: 'TODO',
  },
  {
    id: 2,
    title: '점심 먹기',
    summary: '점심을 먹는다.',
    category: 'PROGRESS',
  },
  {
    id: 3,
    title: '커피 마시기',
    summary: '커피를 마신다.',
    category: 'DONE',
  }

  //새로운 할일 요소 추가 ! 


];


function App() {


   
  const [todos,setTodos]=useState(dummyTodos);
  //useState 변화감지 
  //상태가 바뀌면 리렌더링이 된다. setCount.. 
  
//할일 등록 함수 ! 
  const addTodoHandler =(todo) => {
    const newTodo ={
    id: self.crypto.randomUUID(), //id식별용 랜덤값 
    // title: todo.title,
    // summary: todo.summary,
    //->번거로움 

    ...todo // spreading 문법 (객체 내 프로퍼티들을 풀어해침. )
    }
 
    //dummyTodos.push(newTodo);
    //todos.push(newTodo);
    //새로운 배열을 반환하는 메소드.. 가 있고.. 
    const updatedTodos=[...todos, newTodo];

    //[{id:1 , 기존 Todo}, {id:2},{id:3},{id:UUID, 새로운할일}]
    setTodos(updatedTodos);// ===
    //기존에 넣은 참조값과 새롭게 만든 참조값을 비교하고 .. 만들어? 
    //참조로 비교한다. 
  }
//할일수정함수
  const updateTodoHandler =(updateTodo)=>{
    console.log
    //TODO :추후 구현 예정 

  } 
  return (
    <>
    <DefaultLayout>
        <header>
          <h1 className='pt-8 mx-auto text-red-200 max-w-max text-7xl'>
            <img className='ml-4' src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Thought%20Balloon.png" alt="Thought Balloon" width="75" height="75" />
            <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Animals/Seal.png" alt="Seal" width="75" height="75" />
          </h1>
        </header>
        
        <TodoHeader onAdd ={addTodoHandler}/>
        <TodoBody todos={todos}/>
      </DefaultLayout>
      
    </>
  )
}

export default App


{/*children prop 참고자료
     합성 vs 상속(https://ko.legacy.reactjs.org/docs/composition-vs-inheritance.html) */}

