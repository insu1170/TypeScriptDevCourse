import React, { useState } from "react";

// Todo 아이템의 타입을 정의해주면 더 안전해요!
interface TodoItem {
  id: number;
  text: string;
  isChecked: boolean;
}

const TodoList = () => {
  // 초기값 설정 (fase -> false 오타 수정 및 타입 적용)
  const [todos, setTodos] = useState<TodoItem[]>([
    { id: 1, text: '공부', isChecked: false },
    { id: 2, text: '미팅', isChecked: false }, // id 중복 수정 (3 -> 2)
    { id: 3, text: '잠', isChecked: false }
  ]);

  // 체크박스 변경 핸들러
  const handleCheckedChange = (itemId: number) => {
    setTodos((prevItems) => 
      // 중요: map의 결과를 return해야 합니다!
      prevItems.map((item) =>
        item.id === itemId ? { ...item, isChecked: !item.isChecked } : item
      )
    );
  };
  const removeTodo = (id)=>{
    setTodos(todos.filter((todo)=>todo.id!==id))
  }

  const handleTodoClick = ()=>{
    setShowDeatil(true);
    setSelectedTodo(todo);
  }
  const handleCloseDetail = () =>{
    setShowDeatil(false);
  }
  return (
    <div className='container'>
      <h1>Todo List</h1>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}> {/* key는 index보다 고유한 id가 좋아요 */}
            <input 
              type="checkbox" 
              checked={todo.isChecked} // 체크 상태 연결
              onChange={() => handleCheckedChange(todo.id)} 
            />
            <span>
              {todo.isChecked ? <del>{todo.text}</del> : todo.text}
            </span>

            <button onClick={()=>{
              removeTodo()
            }}>삭제</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;