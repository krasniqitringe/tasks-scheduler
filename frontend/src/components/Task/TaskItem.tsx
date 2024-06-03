// import { CheckboxIcon, CommentIcon, LinkIcon } from "@/assets/img";
import { UserState } from "@/context/usersContext";
import { Draggable } from "@hello-pangea/dnd";
import dayjs from "dayjs";

interface TaskItemTypes {
  index: number;
  users: UserState;
  _id?: string;
  title?: string;
  description?: string;
  startDate?: string;
  dueDate?: string;
  assignedTo?: string[];
  status: string;
  showModal: (task: TaskType) => void;
}

export interface TaskType {
  id: string;
  image?: string;
  subtitle?: string;
  date?: string;
  multipleTask?: Array<number>;
  attachments?: number;
  comments?: number;
  tags?: Array<string>;

  _id: string;
  title: string;
  description: string;
  startDate: string;
  dueDate: string;
  assignedTo: string[];
  status: string;
}

export default function TaskItem({
  index,
  _id,
  title,
  description,
  startDate,
  dueDate,
  assignedTo,
  status,
  showModal,
}: TaskItemTypes) {
  return (
    <Draggable draggableId={_id as string} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onClick={() =>
            showModal({
              _id: _id!,
              title: title!,
              description: description!,
              startDate: startDate!,
              dueDate: dueDate!,
              assignedTo: assignedTo!,
              status: status,
            } as TaskType)
          }
        >
          <div className="task-wrapper">
            {title && <h4>{title}</h4>}
            {description && <p>{description}</p>}
            {startDate && (
              <p className="date">
                {dayjs(startDate).format("MMMM D, YYYY")}
                {dueDate && " - " + dayjs(dueDate).format("MMMM D, YYYY")}
              </p>
            )}

            <div className="task-footer">
              <div className="participants-wrapper">
                <img
                  src="/src/assets/img/participant-1.jpg"
                  alt="task participant"
                />
                <img
                  src="/src/assets/img/participant-2.jpg"
                  alt="task participant"
                />
                <img
                  src="/src/assets/img/participant-3.jpg"
                  alt="task participant"
                />
              </div>

              {/* {multipleTask && (
                <div className="multiple-task">
                  <CheckboxIcon />
                  <span>
                    {multipleTask[0]}/{multipleTask[1]}
                  </span>
                </div>
              )}

              {attachments && (
                <div className="attachment-wrapper">
                  <LinkIcon />
                  <span>
                    {attachments == 1 ? "1 file" : `${attachments} files`}
                  </span>
                </div>
              )}

              {comments && (
                <div className="comment-wrapper">
                  <CommentIcon />
                  <span>
                    {comments == 1 ? "1 Comment" : `${comments} Comments`}
                  </span>
                </div>
              )} */}
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
}
