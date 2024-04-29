"use client";
import { TASK_API } from "@/apiConfig";
import BoardView from "@/components/BoardView";
import ListView from "@/components/ListView";
import TaskModal from "@/components/TaskModal";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import Cookies from "js-cookie";

type Task = {
  title: string;
  description: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  level?: "easy" | "medium" | "hard";
  status?: "todo" | "inProgress" | "done";
};

const MyTaskPage = () => {
  const [tasks, setTasks] = useState<any>([]);
  const [viewMode, setViewMode] = useState<"list" | "board">("list");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [selectedColumn, setSelectedColumn] = useState<keyof any | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isDeleted, setIsDeleted] = useState(false);
  const cookieToken = Cookies.get("token") || "{}";
  const cookieUser = Cookies.get("user") || "{}";
  const authUser = JSON.parse(cookieUser);
  // console.log(cookieToken);

  const toggleViewMode = (mode: "list" | "board") => {
    setViewMode(mode);
  };

  useEffect(() => {
    const fetchTasks = async () => {
      const res = await fetch(`${TASK_API.ALL}`, {
        headers: {
          Authorization: `${cookieToken}`,
        },
      });
      const apiTasks = await res.json();
      // console.log(apiTasks);
      setTasks(apiTasks);
    };
    fetchTasks();
    //@ts-ignore
  }, [isDeleted]);

  const handleDeleteTask = async (taskId: string) => {
    const res = await fetch(TASK_API.DELETE(taskId), {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Authorization: `${cookieToken}`,
      },
    });
    const data = await res.json();
    console.log(data);
    setIsDeleted(!isDeleted);
  };

  const handleOpenAddModal = () => {
    setIsAddModalOpen(true);
  };

  const handleOpenEditModal = (task: Task, column: any, index: number) => {
    setSelectedTask(task);
    setSelectedColumn(column);
    setSelectedIndex(index);
    setIsEditModalOpen(true);
  };

  const handleCloseModals = () => {
    setIsAddModalOpen(false);
    setIsEditModalOpen(false);
  };

  const handleSubmitTask = async (task: Task) => {
    //@ts-ignore
    // if (task.status && tasks[task.status]) {
    //   const updatedTasks = { ...tasks };
    //   // updatedTasks[task.status] = [...updatedTasks[task.status], task];
    //   setTasks(updatedTasks);
    //   handleCloseModals();
    // }
    const res = await fetch(TASK_API.CREATE, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `${cookieToken}`,
      },
      body: JSON.stringify({ ...task, createdBy: authUser?.id }),
    });
    const data = await res.json();
    setTasks([...tasks, data]);
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

export default MyTaskPage;
