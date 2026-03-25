import { GrSubtract } from "react-icons/gr"
import Task from "../Task/Task";
import ActionButton from "../ActionButton/ActionButton";
import type { IList, ITask } from "../../types";
import { useTypedDispatch } from "../../hooks/redux";
import { deleteList, setModalActive } from "../../store/slices/boardsSlice";
import { addLog } from "../../store/slices/loggerSlice";
import { v4 } from "uuid";
import { setModalData } from "../../store/slices/modalSlice";
import { deleteButton, header, listWrapper, name } from "./List.css";
import { SortableContext, useSortable } from '@dnd-kit/sortable';
import { CSS } from "@dnd-kit/utilities";

type TListProps = {
  boardId: string;
  list: IList;
}

const List: React.FC<TListProps> = ({
  list,
  boardId
}) => {

  const dispatch = useTypedDispatch();

  const handleListDelete = (listId: string) => {
    dispatch(deleteList({ boardId, listId }));
    dispatch(
      addLog({
        logId: v4(),
        logMessage: `리스트 삭제하기: ${list.listName}`,
        logAuthor: "User",
        logTimestamp: String(Date.now())
      })
    )
  }

  const handleTaskChange = (
    boardId: string,
    listId: string,
    task: ITask
  ) => {
    dispatch(setModalData({boardId, listId, task}));
    dispatch(setModalActive(true));
  }

  return (
    <SortableContext items={list.tasks.map(t => t.taskId)}>
      <div className={listWrapper}>
        <div className={header}>
          <div className={name}>{list.listName}</div>
          <GrSubtract
            className={deleteButton}
            onClick={() => handleListDelete(list.listId)}
          />
        </div>
        {list.tasks.map((task, index) => {
          const {
            setNodeRef,
            listeners,
            attributes,
            transform,
            transition
          } = useSortable({ id: task.taskId });
          
          const style = {
            transform: CSS.Transform.toString(transform),
            transition,
            cursor: 'grab'
          }
          return (
            <div ref={setNodeRef} style={style} {...listeners} {...attributes}
              onClick={() => handleTaskChange(boardId, list.listId, task)}
              key={task.taskId}
            >
              <Task
                taskName={task.taskName}
                taskDescription={task.taskDescription}
                boardId={boardId}
                id={task.taskId}
                index={index}
              />
            </div>
          )
        })}
        <ActionButton
          boardId={boardId}
          listId={list.listId}
        />
      </div>
    </SortableContext>
  )
}

export default List;