import React from "react";
import { GrSubtract } from "react-icons/gr";
import Task from "../Task/Task";
import ActionButton from "../ActionButton/ActionButton";
import type { IList, ITask } from "../../types";
import { useTypedDispatch } from "../../hooks/redux";
import { deleteList, setModalActive } from "../../store/slices/boardsSlice";
import { addLog } from "../../store/slices/loggerSlice";
import { v4 } from "uuid";
import { setModalData } from "../../store/slices/modalSlice";
import { deleteButton, header, listWrapper, name } from "./List.css";

// ✅ react-beautiful-dnd에서 필요한 컴포넌트와 타입을 가져옵니다.
import { Droppable, Draggable } from "react-beautiful-dnd";
import type { DroppableProvided, DraggableProvided } from "react-beautiful-dnd";

type TListProps = {
  boardId: string;
  list: IList;
};

const List: React.FC<TListProps> = ({ list, boardId }) => {
  const dispatch = useTypedDispatch();

  const handleListDelete = (listId: string) => {
    dispatch(deleteList({ boardId, listId }));
    dispatch(
      addLog({
        logId: v4(),
        logMessage: `리스트 삭제하기: ${list.listName}`,
        logAuthor: "User",
        logTimestamp: String(Date.now()),
      })
    );
  };

  const handleTaskChange = (boardId: string, listId: string, task: ITask) => {
    dispatch(setModalData({ boardId, listId, task }));
    dispatch(setModalActive(true));
  };

  return (
    <Droppable droppableId={list.listId}>
      {(provided: DroppableProvided) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className={listWrapper}
        >
          <div className={header}>
            <div className={name}>{list.listName}</div>
            <GrSubtract
              className={deleteButton}
              onClick={() => handleListDelete(list.listId)}
            />
          </div>

          {list.tasks.map((task, index) => (
            <Draggable key={task.taskId} draggableId={task.taskId} index={index}>
              {(provided: DraggableProvided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  onClick={() => handleTaskChange(boardId, list.listId, task)}
                >
                  <Task
                    taskName={task.taskName}
                    taskDescription={task.taskDescription}
                    boardId={boardId}
                    id={task.taskId}
                    index={index}
                  />
                </div>
              )}
            </Draggable>
          ))}

          {/* ✅ 드래그 시 리스트 영역이 줄어들지 않도록 빈 공간을 채워줍니다. */}
          {provided.placeholder}

          <ActionButton boardId={boardId} listId={list.listId} />
        </div>
      )}
    </Droppable>
  );
};

export default List;