import { atom, selector } from "recoil";

export interface IToDo {
    text: string;
    id: number;
    category: "DOING" | "TODO" | "DONE";
}

export const toDoState = atom<IToDo[]>({
    key: "toDo",
    default: [],
})

export const toDoSelector = selector({
    key: "toDoSelector",
    get: ({ get }) => {
        const toDos = get(toDoState)
        return [
            toDos.filter((toDo) => toDo.category === "TODO"),
            toDos.filter((toDo) => toDo.category === "DOING"),
            toDos.filter((toDo) => toDo.category === "DONE")
        ];
    }
})
