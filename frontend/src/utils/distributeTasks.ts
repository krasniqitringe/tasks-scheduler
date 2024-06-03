import { TaskType } from "@/components/Task/TaskItem";

interface Column {
  title: string;
  items: TaskType[];
}

export interface Columns {
  backlog: Column;
  to_do: Column;
  in_progress: Column;
  in_review: Column;
}

export const columnsInitialState: Columns = {
  backlog: {
    title: "Backlog",
    items: [],
  },
  to_do: {
    title: "To Do",
    items: [],
  },
  in_progress: {
    title: "In Progress",
    items: [],
  },
  in_review: {
    title: "Review",
    items: [],
  },
};

const isTaskInColumn = (column: Column, task: TaskType) =>
  column.items.some((item) => item._id === task._id);

export const distributeTasks = (
  tasks: TaskType[],
  action?: boolean
): Columns => {
  const columns =
    action === true
      ? {
          backlog: {
            title: "Backlog",
            items: [],
          },
          to_do: {
            title: "To Do",
            items: [],
          },
          in_progress: {
            title: "In Progress",
            items: [],
          },
          in_review: {
            title: "Review",
            items: [],
          },
        }
      : { ...columnsInitialState };

  tasks.forEach((task) => {
    switch (task.status) {
      case "backlog":
        if (!isTaskInColumn(columns.backlog, task)) {
          columns.backlog.items.push(task);
        }
        break;
      case "to_do":
        if (!isTaskInColumn(columns.to_do, task)) {
          columns.to_do.items.push(task);
        }
        break;
      case "in_progress":
        if (!isTaskInColumn(columns.in_progress, task)) {
          columns.in_progress.items.push(task);
        }
        break;
      case "in_review":
        if (!isTaskInColumn(columns.in_review, task)) {
          columns.in_review.items.push(task);
        }
        break;
      default:
        console.warn(`Unknown status: ${task.status}`);
    }
  });

  return columns;
};
