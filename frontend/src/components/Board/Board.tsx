/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { DragDropContext, DropResult, Droppable } from "@hello-pangea/dnd";
// Components
import TaskItem, { TaskType } from "@/components/Task/TaskItem";
import ModalComponent from "@/components/Modal/Modal";
// Images
import { DotsIcon, PlusIcon } from "@/assets/img";
// Data
import { Button, Spin } from "antd";
import { useTask } from "@/context/taskContext";
import { useUser } from "@/context/usersContext";
import { columnsInitialState, distributeTasks } from "@/utils/distributeTasks";

const Board = () => {
  const {
    loading,
    createTask,
    updateTask,
    fetchTasks,
    tasks,
    deleteTask,
    updateTaskAssignees,
  }: any = useTask();
  const { fetchUsers, users }: any = useUser();
  const [columns, setColumns] = useState(columnsInitialState);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState<TaskType | null>();

  useEffect(() => {
    const fetchData = async () => {
      await fetchUsers();
      const response = await fetchTasks();
      distributeTasksFunction(response, true);
    };

    fetchData();
  }, []);

  const distributeTasksFunction = async (tasks: any, action?: boolean) => {
    setColumns(distributeTasks(tasks, action));
  };

  const showModal = (task?: TaskType) => {
    setCurrentTask(task || null);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleDelete = async () => {
    if (currentTask) {
      try {
        await deleteTask(currentTask._id);
        const response = await fetchTasks();

        distributeTasksFunction(response, true);
      } catch (error) {
        console.error("Error deleting task or fetching tasks", error);
      }
    }
    setCurrentTask(null);
  };

  const handleFormSubmit = async (data: TaskType) => {
    if (currentTask) {
      updateTask(currentTask._id, data);
    } else {
      createTask(data);
      const response = await fetchTasks();
      distributeTasksFunction(response, true);
    }

    setCurrentTask(null);
  };

  const handleFormAssignees = (id: string, item: [string]) => {
    const userIds = [...item];
    updateTaskAssignees(id, { userIds });
  };

  const onDragEnd = (result: DropResult, columns: any, setColumns: any) => {
    const { destination, source } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const newColumns = { ...columns };

    const sourceItems = Array.from(sourceColumn.items);
    const destItems = Array.from(destColumn.items);

    newColumns[source.droppableId] = {
      ...sourceColumn,
      items: sourceItems,
    };

    newColumns[destination.droppableId] = {
      ...destColumn,
      items: destItems,
    };

    const [removed] = newColumns[source.droppableId].items.splice(
      source.index,
      1
    );

    newColumns[destination.droppableId].items.splice(
      destination.index,
      0,
      removed
    );

    updateTask(result.draggableId.replace("droppable", ""), {
      status: destination.droppableId,
    }).then(() => {
      console.log("new columns---", newColumns);
      setColumns(newColumns);
    });
  };

  return (
    <DragDropContext
      onDragEnd={(result) => {
        onDragEnd(result, columns, setColumns);
      }}
    >
      <div className="boards-wrapper">
        {loading ? (
          <Spin />
        ) : (
          columns &&
          Object.entries(columns).map(([columnId, column], index) => {
            return (
              <Droppable key={index} droppableId={columnId}>
                {(provided) => (
                  <div
                    className="board-wrapper"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    <div className="board-header">
                      <p>{column.title} </p>

                      <div className="actions-wrapper">
                        <a href="#" className="settings">
                          <DotsIcon />
                        </a>
                        <Button
                          className="add-item"
                          onClick={() => showModal()}
                        >
                          <PlusIcon />
                        </Button>
                      </div>
                    </div>

                    <div className="board-task-wrapper">
                      {column.items.map(
                        ({
                          index,
                          title,
                          _id,
                          description,
                          startDate,
                          dueDate,
                          assignedTo,
                          status,
                        }: any) => (
                          <>
                            <TaskItem
                              _id={_id}
                              title={title}
                              description={description}
                              startDate={startDate}
                              dueDate={dueDate}
                              assignedTo={assignedTo}
                              status={status}
                              key={index}
                              users={users}
                              index={index}
                              showModal={showModal}
                            />
                          </>
                        )
                      )}
                    </div>
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            );
          })
        )}
      </div>
      <ModalComponent
        loading={loading}
        open={isModalOpen}
        handleClose={handleCancel}
        handleDelete={handleDelete}
        onSubmit={handleFormSubmit}
        onChangeAssignee={handleFormAssignees}
        currentTask={currentTask}
        users={users}
      />
    </DragDropContext>
  );
};

export default Board;
