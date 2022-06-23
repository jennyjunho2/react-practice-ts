import { Droppable } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { IToDo } from "../atoms";
import DraggabbleCard from "./DraggabbleCard";

const Wrapper = styled.div`
  padding: 10px 0px;
  padding-top: 10px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 200px;
  display: flex;
  flex-direction: column;
`

interface IAreaProps {
    isDraggingFromThis: boolean;
    isDraggingOver: boolean;
}

const Area = styled.div<IAreaProps>`
    background-color: rgba(255, 0, 0,
        ${props => props.isDraggingOver ? 0.3
        : props.isDraggingFromThis ? 0.2 :
            0.1});
    flex-grow: 1;
    border-radius: 10%;
    transition: background-color .2s ease-in-out;
    padding: 20px;
`

const Title = styled.h2`
    text-align: center;
    font-weight: 600;
    margin-bottom: 10px;
    font-size: 18px;
`

interface IForm {
    toDo: string;
}

const Form = styled.form`
    width: 100%;
    input {
        width: 100%;
    }
`

interface IBoardProps {
    toDos: IToDo[];
    boardId: string;
}

function Board({ toDos, boardId }: IBoardProps) {
    const { register, setValue, handleSubmit } = useForm<IForm>();
    const onValid = ({ toDo }: IForm) => {
        setValue("toDo", "")
    }
    return (
        <Wrapper>
            <Title>{boardId}</Title>
            <Form onSubmit={handleSubmit(onValid)}>
                <input
                    {...register("toDo", { required: true })}
                    type="text"
                    placeholder={`Add Task on ${boardId}`}
                />
            </Form>
            <Droppable droppableId={boardId}>
                {(magic, snapshot) => (
                    <Area
                        isDraggingOver={snapshot.isDraggingOver}
                        isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)}
                        ref={magic.innerRef}
                        {...magic.droppableProps}>
                        {toDos.map((toDo, index) =>
                            <DraggabbleCard
                                key={toDo.id}
                                index={index}
                                toDoId={toDo.id}
                                toDoText={toDo.text}
                            />
                        )}
                        {magic.placeholder}
                    </Area>
                )}
            </Droppable>
        </Wrapper>
    )
}

export default Board;
