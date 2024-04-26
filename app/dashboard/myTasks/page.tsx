"use client";
import BoardView from "@/components/BoardView";
import ListView from "@/components/ListView";
import TaskModal from "@/components/TaskModal";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";

type Task = {
  title: string;
  description: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  score?: number;
  status?: "todo" | "inProgress" | "done";
};

export const initialTasks = {
  todo: [
    {
      title: "Task 1",
      description: "Description 1",
      startDate: "2024-04-23",
      startTime: "09:00",
      endDate: "2024-04-26",
      endTime: "10:00",
      score: 0,
      status: "todo",
    },
    {
      title: "Task 2",
      description: "Description 2",
      startDate: "2024-04-23",
      startTime: "10:00",
      endDate: "2024-04-26",
      endTime: "11:00",
      score: 0,
      status: "todo",
    },
  ],
  inProgress: [
    {
      title: "Task 3",
      description: "Description 3",
      startDate: "2024-04-23",
      startTime: "11:00",
      endDate: "2024-04-26",
      endTime: "12:00",
      score: 0,
      status: "inProgress",
    },
  ],
  done: [
    {
      title: "Task 4",
      description: "Description 4",
      startDate: "2024-04-23",
      startTime: "13:00",
      endDate: "2024-04-26",
      endTime: "14:00",
      score: 0,
      status: "done",
    },
  ],
};

const Page = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [viewMode, setViewMode] = useState<"list" | "board">("list");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [selectedColumn, setSelectedColumn] = useState<
    keyof typeof initialTasks | null
  >(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const toggleViewMode = (mode: "list" | "board") => {
    setViewMode(mode);
  };

  const handleDeleteTask = (
    column: keyof typeof initialTasks,
    index: number
  ) => {
    const updatedTasks = { ...tasks };
    updatedTasks[column] = tasks[column].filter((_, idx) => idx !== index);
    setTasks(updatedTasks);
  };

  const handleOpenAddModal = () => {
    setIsAddModalOpen(true);
  };

  const handleOpenEditModal = (
    task: Task,
    column: keyof typeof initialTasks,
    index: number
  ) => {
    setSelectedTask(task);
    setSelectedColumn(column);
    setSelectedIndex(index);
    setIsEditModalOpen(true);
  };

  const handleCloseModals = () => {
    setIsAddModalOpen(false);
    setIsEditModalOpen(false);
  };

  const handleSubmitTask = (task: Task) => {
    if (task.status && tasks[task.status]) {
      const updatedTasks = { ...tasks };
      updatedTasks[task.status] = [...updatedTasks[task.status], task];
      setTasks(updatedTasks);
      handleCloseModals();
    }
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-between w-full mb-4">
        <h1 className="text-3xl font-bold">My Tasks</h1>
        <div className="flex gap-2">
          <button
            onClick={() => toggleViewMode("list")}
            className={`p-2 rounded ${
              viewMode === "list" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            List View
          </button>
          <button
            onClick={() => toggleViewMode("board")}
            className={`p-2 rounded ${
              viewMode === "board" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            Board View
          </button>
          <button
            onClick={handleOpenAddModal}
            className="text-md flex items-center gap-2 bg-green-600 text-white py-1 px-3 rounded-md"
          >
            Add New Task <FaPlus />
          </button>
        </div>
      </div>
      {viewMode === "list" ? (
        <ListView
          tasks={tasks}
          setTasks={setTasks}
          onDelete={handleDeleteTask}
          onEdit={handleOpenEditModal}
        />
      ) : (
        <BoardView
          tasks={tasks}
          setTasks={setTasks}
          onDelete={handleDeleteTask}
        />
      )}
      <TaskModal
        isOpen={isAddModalOpen}
        onClose={handleCloseModals}
        onSubmit={handleSubmitTask}
      />
    </div>
  );
};

export default Page;
