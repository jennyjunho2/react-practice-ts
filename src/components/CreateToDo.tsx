import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { toDoState } from "../atoms";

interface IForm {
    toDo: string;
}

export default function CreateToDo() {
    const setToDos = useSetRecoilState(toDoState)
    const { register, handleSubmit, setValue } = useForm<IForm>()
    const handleValid = ({ toDo }: IForm) => {
        setValue("toDo", "")
        setToDos((oldToDos) => [...oldToDos, { text: toDo, id: Date.now(), category: "TODO" }])
    }
    return (
        <form onSubmit={handleSubmit(handleValid)}>
            <input
                {...register("toDo", {
                    required: "Please write a To Do"
                })}
                placeholder="Write a to do"
            />
            <button>Add</button>
        </form>
    );
}