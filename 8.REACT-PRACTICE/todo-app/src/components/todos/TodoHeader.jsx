import { useState } from "react";
import Modal from "../ui/Modal";
import TodoFilter from "./TodoFilter";
import TodoForm from './TodoForm';

import { createPortal } from 'react-dom';

const TodoHeader = ({onAdd}) => {

    // Modal의 열기/닫기 여부를 관리하는 상태값
    const [openModal, open] = useState(false);

    return (
        <div className="flex items-center justify-between mb-2" id="task-control">
            <button 
                onClick={() => open(true)}
                className="px-6 py-2 font-semibold text-gray-100 bg-gray-800 border-none rounded cursor-pointer"
                data-cy="add-todo-button">할일 등록 
            </button>

            {/* Modal 코드 추가 */}
            {openModal && createPortal(
                // Modal 컴포넌트에게 onClose라는 이름의 props로 open 함수를 전달
                <Modal onClose={() => open(false)}>
                    <TodoForm actionTitle={'등록'} onAction={onAdd} onClose={() => open(false)}/>
                </Modal>, // 렌더링할 대상 컴포넌트
                document.body // 렌더링할 위치
            )}

            <TodoFilter />
        </div>
    )
}

export default TodoHeader;