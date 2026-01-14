import React from 'react'
import TodoItem from './TodoItem';


const TodoBody = ({todos, onUpdate}) => {

  // app.jsx를 통해 전달받은 todos props를 가지고 맵을 돌림. 
  const todoList = 
    todos.map(todo => <TodoItem 
                      todo={todo}
                       key={todo.id}
                        onUpdate = {onUpdate}
                        onDelete={onDelete}/>)
  // [<TodoItem />, <TodoItem />, <TodoItem />]

  return (
    <>
    {todoList}
    {/* todoList는 아래의 형태로 렌더링됨(같음) */}
    
    {/* 할일 데이터 3개가 <TodoItem /> 컴포넌트의 형태로 렌더링될 예정 */}
    {/* <TodoItem /> */}
    {/* <TodoItem /> */}
    {/* <TodoItem /> */}
    </>
  )
}

export default TodoBody


//rfce로 기본 구조 형성 