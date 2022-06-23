import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "./atoms";
import Board from "./Components/Board";

const Wrapper = styled.div`
  display: flex;
  max-width: 680px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`

const Boards = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
`

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState)
  const onDragEnd = ({ draggableId, destination, source }: DropResult) => {
    if (!destination) { return; }
    // setToDos((current) => {
    //   const temp = [...current];
    //   temp.splice(source.index, 1)
    //   temp.splice(destination?.index, 0, draggableId)
    //   return temp;
    // })
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          {Object.keys(toDos).map((Id) => (
            <Board boardId={Id} key={Id} toDos={toDos[Id]} />
          ))}
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
}

export default App;