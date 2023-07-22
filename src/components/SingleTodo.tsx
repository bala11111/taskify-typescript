import React , {useRef, useState} from 'react'
import { Todo } from '../models/models'
import { Draggable } from "react-beautiful-dnd";
import './styles.css'
export const SingleTodo : React.FC<{
  index : number,
  todo : Todo,
  todos : Todo[],
  setTodos : React.Dispatch<React.SetStateAction<Todo[]>>
}> = ({index,todo,todos,setTodos}) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);
  const inputRef = useRef<HTMLInputElement>(null)

  const handleEdit = (e:React.FormEvent, id : number) => {
    e.preventDefault()
    setTodos(
        todos.map((todo) => (todo.id === id ? { ...todo, todo: editTodo } : todo))
      );
      setEdit(false);
  }

  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleDone = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };

  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided, snapshot) => (
        <form
          onSubmit={(e) => handleEdit(e, todo.id)}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className={`todos__single ${snapshot.isDragging ? "drag" : ""}`}
        >
          {edit ? (
            <input
              value={editTodo}
              onChange={(e) => setEditTodo(e.target.value)}
              className="todos__single--text"
              ref={inputRef}
            />
          ) : todo.isDone ? (
            <s className="todos__single--text">{todo.todo}</s>
          ) : (
            <span className="todos__single--text">{todo.todo}</span>
          )}
          <div>
            <span
              className="icon"
              onClick={() => {
                if (!edit && !todo.isDone) {
                  setEdit(!edit);
                }
              }}
            >
              E
            </span>
            <span className="icon" onClick={() => handleDelete(todo.id)}>
              Dlt
            </span>
            <span className="icon" onClick={() => handleDone(todo.id)}>
              D
            </span>
          </div>
        </form>
      )}
    </Draggable>
  )
}
