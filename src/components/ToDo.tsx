import React from "react";
import { useSetRecoilState } from "recoil";
import { IToDo, toDoState } from "../atoms";

export default function ToDo({ text, category, id }: IToDo) {
    const setToDos = useSetRecoilState(toDoState);
    const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        const { currentTarget: { name } } = event;
        setToDos((oldToDos) => {
            const targetIdx = oldToDos.findIndex(toDo => toDo.id === id)
            const newToDo = { text, id, category: name as any }
            return [...oldToDos.slice(0, targetIdx), newToDo, ...oldToDos.slice(targetIdx + 1)]
        })
    }
    return (
        <li>
            <span>{text}</span>
            {category !== "DOING" && <button name="DOING" onClick={onClick}>Doing</button>}
            {category !== "TODO" && <button name="TODO" onClick={onClick}>To Do</button>}
            {category !== "DONE" && <button name="DONE" onClick={onClick}>Done!</button>}
        </li >
    );
}