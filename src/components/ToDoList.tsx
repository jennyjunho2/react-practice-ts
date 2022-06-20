import React from "react";
import { useRecoilValue, } from "recoil";
import { toDoSelector } from "../atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

function ToDoList() {
    const [todo, doing, done] = useRecoilValue(toDoSelector)
    return (
        <div>
            <h1>To Dos</h1>
            <CreateToDo />
            <h2>To Do</h2>

            <ul>
                {todo.map((toDo) =>
                    <ToDo key={toDo.id} {...toDo} />
                )}
            </ul>
            <hr />
            <h2>Doing</h2>
            <ul>
                {doing.map((toDo) =>
                    <ToDo key={toDo.id} {...toDo} />
                )}
            </ul>
            <hr />
            <h2>Done</h2>
            <ul>
                {done.map((toDo) =>
                    <ToDo key={toDo.id} {...toDo} />
                )}
            </ul>

        </div>
    );
}

export default ToDoList;