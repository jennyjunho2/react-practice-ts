import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import React from "react";

interface ICardProps {
    isDragging: boolean;
}

const Card = styled.div<ICardProps>`
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px 10px;
  background-color: ${(props) =>
        props.isDragging ? "#d3d3d3" : props.theme.cardColor};
  box-shadow: ${(props) => props.isDragging ? "0px 2px 5px rgba(0, 0, 0, 0.1)" : "none"};
`

interface IDraggableCardProps {
    toDoId: number;
    toDoText: string;
    index: number;
}

function DraggableCard({ toDoId, toDoText, index }: IDraggableCardProps) {
    return (<Draggable draggableId={toDoId + ""} index={index}>
        {(magic, snapshot) => (
            <Card
                isDragging={snapshot.isDragging}
                ref={magic.innerRef}
                {...magic.dragHandleProps}
                {...magic.draggableProps}>
                {toDoText}
            </Card>
        )}
    </Draggable>)
}

export default React.memo(DraggableCard)