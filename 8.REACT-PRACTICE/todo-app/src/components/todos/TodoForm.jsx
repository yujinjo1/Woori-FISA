import { TODO_CATEGORY_ICON } from '@/constants/icon'
import { useState } from 'react';

// actionTitle - 할일 '등록'인지 '수정'인지 구분하는 플래그 변수
const TodoForm = ({ actionTitle, onAction, onClose, todo }) => {

    const isNewTodoForm = actionTitle.startsWith('등록') ? true : false;

    const [title, setTitle] = useState(isNewTodoForm ? '' : todo.title);
    const [summary, setSummary] = useState(isNewTodoForm ? '' : todo.summary);
    const [category, setCategory] = useState(isNewTodoForm ? 'TODO' : todo.category);

    // 할일 등록(Add) 버튼을 눌렀을 때 동작시킬 핸들러

    //활성화된 modal의 구분에 따라 할일 등록/수정 처리 함수 
    const todoActionHandler= () => {
        const updateTodo={
            id:todo.id,
            title:title,
            summary,
            category

        }
        //TODO:수정인지 등록인지에 따른 id값 가공 
        if(!isNewTodoForm)
            updateTodo.id=todo.id;
        onAction(updateTodo);
        // App.jsx로 전달할 새로운 할일 객체
        const todo = { title, summary, category }

        // App.jsx로부터 props로 전달받은 onAdd 호출
        onAdd(todo);

        // 모달창 닫기
        onClose();
    }
    
    
    return (
        <>
            <h3 className="text-3xl text-red-200">할일 {actionTitle}</h3>
            <form className='my-2'>
                <div>
                    <label className='block mb-2 text-xl text-white' htmlFor='title'>Title</label>
                    <input 
                           value={title}
                           onChange={event => setTitle(event.target.value)}
                           className='w-full p-2 border-[1px] border-gray-300 bg-gray-200 text-gray-900 rounded' 
                           type='text' id='title' />
                </div>
                <div>
                    <label className='block mb-2 text-xl text-white' htmlFor='summary'>Summary</label>
                    <textarea 
                              value={summary}
                              onChange={event => setSummary(event.target.value)}
                              className='w-full p-2 border-[1px] border-gray-300 bg-gray-200 text-gray-900 rounded' 
                              id='summary' rows='5' />
                </div>
                <div>
                    <label className='block mb-2 text-xl text-white' htmlFor='category'>Category</label>
                    <select 
                            value={category}
                            onChange={event => setCategory(event.target.value)}
                            className='w-full p-2 border-[1px] border-gray-300 bg-gray-200 text-gray-900 rounded' 
                            id='category' >
                        <option value='TODO'>{TODO_CATEGORY_ICON.TODO} To do</option>
                        <option value='PROGRESS'>{TODO_CATEGORY_ICON.PROGRESS} On progress</option>
                        <option value='DONE'>{TODO_CATEGORY_ICON.DONE} Done</option>
                    </select>
                </div>

                <div className='flex justify-end gap-4'>
                    <button onClick={onClose} className='text-xl text-white' type='button'>Cancel</button>
                    <button onClick={todoActionHandler}className='px-6 py-3 text-xl text-red-200' type='button'>{actionTitle}</button>
                </div>
            </form>
        </>
    )
};

export default TodoForm;