import React from "react";
import { useRecoilState, useRecoilValue, } from "recoil";
import { toDoState } from "../atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

function ToDoList() {

    const toDos = useRecoilValue(toDoState);

    return (
        <div>
            <h1>To Dos</h1>
            <CreateToDo />
            <ul>
                {toDos.map((toDo) =>
                    <ToDo key={toDo.id} {...toDo} />
                )}
            </ul>
        </div>

    );
}

export default ToDoList;