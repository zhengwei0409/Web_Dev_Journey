import { useState } from "react"


export function Todo() {

    const [todo, setTodo] = useState<string>();
    const [todoList, setTodoList] = useState<(string | undefined)[]>([]);

    function addTodo() {
        setTodoList([...todoList,todo]);
        setTodo("");
    }

    function deleteTodo(todo: number) {
        const newTodoList = todoList.filter((_, index) => index !== todo );
        setTodoList(newTodoList);
    }   

    return (
        <>
            <input 
                type="text" 
                onChange={(e) => {
                    setTodo(e.target.value);
                }} 
                value={todo}
            />
            <button onClick={addTodo}>Add</button>
            <br />
            <h1>Todo List</h1>
            {
                todoList.map((todo, index) => {
                    return (
                        <div key={index}>
                            <div>{todo}</div>
                            <button onClick={() => deleteTodo(index)}>Delete</button>
                        </div>
                    )
                })
            }
        </>
    )
}