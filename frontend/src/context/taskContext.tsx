import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "@/config/baseURL";

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

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/tasks`);
        setTask(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const createTask = async (task: TaskState) => {
    setLoading(true);

    try {
      const response = await axios.post(`${BASE_URL}/tasks/`, task);
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
      const response = await axios.put(`${BASE_URL}/tasks/${id}`, task);
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
      const response = await axios.delete(`${BASE_URL}/tasks/${id}`);
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
      const response = await axios.get(`${BASE_URL}/tasks/${id}`);
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
      const response = await axios.put(
        `${BASE_URL}/tasks/${id}/assignees`,
        assignees
      );
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
