import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "@hello-pangea/dnd";
import TaskItem from "../Task/TaskItem";
import { useState } from "react";
import { DotsIcon, PlusIcon } from "@/assets/img";

const dummyData = [
  {
    id: "0",
    image: "/src/assets/img/settingsBackground.png",
    title: "Create styleguide foundation",
    subtitle: "Create content for peceland App",
    date: "Aug 20, 2021",
    multipleTask: [0, 6],
    tags: ["Design"],
    attachments: undefined,
    comments: undefined,
  },
  {
    id: "1",
    title: "Copywriting Content",
    subtitle: "Create content for peceland App",
    date: "Aug 20, 2021",
    multipleTask: [0, 8],
    tags: ["Research"],
    attachments: undefined,
    comments: undefined,
  },
  {
    id: "2",
    image: "/src/assets/img/settingsBackground.png",
    title: "Update requiment list",
    subtitle: "Create content for peceland App",
    date: "Sep 20, 2021",
    multipleTask: undefined,
    tags: ["Planning"],
    attachments: 11,
    comments: undefined,
  },
  {
    id: "3",
    image: "/src/assets/img/settingsBackground.png",
    title: "Create styleguide foundation",
    subtitle: "Create content for peceland App",
    date: "Aug 20, 2021",
    multipleTask: undefined,
    tags: ["Content"],
    attachments: undefined,
    comments: 8,
  },
  {
    id: "4",
    image: "/src/assets/img/settingsBackground.png",
    title: "Create styleguide foundation",
    subtitle: "Create content for peceland App",
    date: "Aug 20, 2021",
    multipleTask: [0, 6],
    tags: ["Content", "Design"],
    attachments: undefined,
    comments: undefined,
  },
];

interface BoardTypes {
  title: string;
}

export default function Board({ title }: BoardTypes) {
  const [board, setBoard] = useState(dummyData);

  function handleOnDragEnd(result: DropResult) {
    if (!result.destination) return;

    const items = Array.from(board);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setBoard(items);
  }

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="boards">
        {(provided) => (
          <div
            className="board-wrapper"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            <div className="board-header">
              <p>{title}</p>

              <div className="actions-wrapper">
                <a href="#" className="settings">
                  <DotsIcon />
                </a>
                <a href="#" className="add-item">
                  <PlusIcon />
                </a>
              </div>
            </div>
            {board.map(
              (
                {
                  id,
                  image,
                  title,
                  subtitle,
                  date,
                  multipleTask,
                  attachments,
                  comments,
                  tags,
                },
                index
              ) => {
                return (
                  <Draggable key={id} draggableId={id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <TaskItem
                          image={image}
                          title={title}
                          subtitle={subtitle}
                          date={date}
                          multipleTask={multipleTask}
                          tags={tags}
                          attachments={attachments}
                          comments={comments}
                        />
                      </div>
                    )}
                  </Draggable>
                );
              }
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
