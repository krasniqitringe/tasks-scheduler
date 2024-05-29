import React, { createContext, useState } from "react";
import api from "@/config/api";

const TaskContext = createContext({});

interface TaskState {
  title: string;
  description: string;
  startDate: string;
  dueDate: string;
  assignedTo: [string];
  status: string;
}

interface AssigneeState {
  userIds: [string];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const TaskProvider = ({ children }: any) => {
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  const fetchTasks = async () => {
    try {
      const response = await api(`/tasks`, "GET");

      setTask(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const createTask = async (task: TaskState) => {
    setLoading(true);

    try {
      const response = await api(`/tasks`, "POST", task);
      await fetchTasks();
      setTask(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const updateTask = async (id: string, task: TaskState) => {
    setLoading(true);
    try {
      const response = await api(`/tasks/${id}`, "PUT", task);
      await fetchTasks();
      setTask(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteTask = async (id: string) => {
    setLoading(true);
    try {
      const response = await api(`/tasks/${id}`, "DELETE");
      await fetchTasks();
      setTask(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchTaskById = async (id: string) => {
    setLoading(true);
    try {
      const response = await api(`/tasks/${id}`, "GET");
      setTask(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const updateTaskAssignees = async (id: string, assignees: AssigneeState) => {
    setLoading(true);
    try {
      const response = await api(`/tasks/${id}/assignees`, "PUT", assignees);
      setTask(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <TaskContext.Provider
      value={{
        task,
        loading,
        error,
        fetchTasks,
        createTask,
        updateTask,
        deleteTask,
        fetchTaskById,
        updateTaskAssignees,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTask = () => {
  return React.useContext(TaskContext);
};
