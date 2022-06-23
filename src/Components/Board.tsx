import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DraggabbleCard from "./DraggabbleCard";

const Wrapper = styled.div`
  padding: 20px 10px;
  padding-top: 30px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 200px;
`

interface IBoardProps {
    toDos: string[];
    boardId: string;
}

function Board({ toDos, boardId }: IBoardProps) {
    return (
        <Droppable droppableId="one">
            {(magic) => (
                <Wrapper ref={magic.innerRef} {...magic.droppableProps}>
                    {toDos.map((toDo, index) =>
                        <DraggabbleCard key={toDo} index={index} toDo={toDo} />
                    )}
                    {magic.placeholder}
                </Wrapper>
            )}
        </Droppable>
    )
}

export default Board;
