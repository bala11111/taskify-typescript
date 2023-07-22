import React ,{useEffect,useState} from 'react'
import {Todo} from '../models/models'
import {SingleTodo} from './SingleTodo'
import { Droppable,DroppableProps } from "react-beautiful-dnd";
import './styles.css'

interface props { 
    todos : Todo[];
    setTodos : React.Dispatch<React.SetStateAction<Todo[]>>,
    completedTodos : Todo[];
    setCompletedTodos : React.Dispatch<React.SetStateAction<Todo[]>>,
}

const StrictModeDroppable = ({children,...props}:DroppableProps) => {
    const [enabled, setEnabled] = useState(false);

    useEffect(()=>{
        const animation = requestAnimationFrame(() => setEnabled(true));

        return () => {
            cancelAnimationFrame(animation);
            setEnabled(false);
          };      
    },[])

    if (!enabled) {
        return null;
      }

    return <Droppable {...props}>{children}</Droppable>;
}

export const TodoList : React.FC<props> = ({
    todos,
    setTodos,
    completedTodos,
    setCompletedTodos
}) => {
  return (
    <div className='container'>
        <StrictModeDroppable droppableId="TodosList">
        {(provided, snapshot) => (
          <div
            className={`todos ${snapshot.isDraggingOver ? "dragactive" : ""}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="todos__heading">Active Tasks</span>
            {todos?.map((todo, index) => (
              <SingleTodo
                index={index}
                todos={todos}
                todo={todo}
                key={todo.id}
                setTodos={setTodos}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </StrictModeDroppable>
      <StrictModeDroppable droppableId="TodosRemove">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`todos  ${
              snapshot.isDraggingOver ? "dragcomplete" : "remove"
            }`}
          >
            <span className="todos__heading">Completed Tasks</span>
            {completedTodos?.map((todo, index) => (
              <SingleTodo
                index={index}
                todos={completedTodos}
                todo={todo}
                key={todo.id}
                setTodos={setCompletedTodos}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </StrictModeDroppable>
    </div>
  )
}
