import { atom } from "recoil";

export interface IToDo {
    text: string;
    id: number;
    category: "DOING" | "TODO" | "DONE";
}

export const toDoState = atom<IToDo[]>({
    key: "toDo",
    default: [],
})
