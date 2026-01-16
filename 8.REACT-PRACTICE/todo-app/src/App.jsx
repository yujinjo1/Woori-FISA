import { useState } from "react";
import TodoBody from "./components/todos/TodoBody"
import TodoHeader from "./components/todos/TodoHeader"
import DefaultLayout from "./layouts/DefaultLayout"
import Logo from "./components/ui/Logo";
import { TodoProvider } from "./contexts/TodoContext";
import NewModal from "./components/ui/NewModal";
import TodoForm from "./components/todos/TodoForm";

function App() {
  return (
    <>
      <DefaultLayout>
        <Logo />

      <TodoProvider>
        <TodoHeader />
        <TodoBody />
      </TodoProvider>

        <div>할일관리와 관련이 없는 또 다른 관심사 영역</div>
        <NewModal>
          <NewModal.Open>
          <button>할일 등록</button>


          </NewModal.Open>
          <NewModal.Dialog>

            <TodoForm actionTitle={'등록'}/>

          </NewModal.Dialog>
         
        </NewModal>
      </DefaultLayout>
    </>
  )
}

export default App