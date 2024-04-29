import React, { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import TaskModal from "./TaskModal";
import { TASK_API } from "@/apiConfig";
import Cookies from "js-cookie";

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

type ListViewProps = {
  tasks: {
    todo: Task[];
    inProgress: Task[];
    done: Task[];
  };
  setTasks: React.Dispatch<React.SetStateAction<any>>;
  onDelete: (column: any, index: number) => void;
  onEdit: (updatedTask: Task, column: any, index: number) => void;
};

const ListView: React.FC<any> = ({ tasks, onDelete, onEdit, setTasks }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [selectedColumn, setSelectedColumn] = useState<keyof any | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const cookieToken = Cookies.get("token") || "{}";
  const [customTasks, setCustomTasks] = useState<any>({
    todo: [],
    inProgress: [],
    done: [],
  });

  // console.log({ customTasks, tasks });

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
  }, [selectedTask]);
  useEffect(() => {
    let todoList = [];
    let inProgressList = [];
    let doneList = [];

    Array.isArray(tasks) &&
      tasks.forEach((t) => {
        if (t.status === "todo") {
          // setCustomTasks({ ...customTasks, todo: [...customTasks?.todo, t] });
          todoList.push(t);
        } else if (t.status === "in progress") {
          // setCustomTasks({
          //   ...customTasks,
          //   inProgress: [...customTasks?.inProgress, t],
          // });
          inProgressList.push(t);
        } else {
          doneList.push(t);
          // setCustomTasks({ ...customTasks, done: [...customTasks?.done, t] });
        }
        setCustomTasks({
          // ...customTasks,
          // inProgress: [...customTasks?.inProgress, t],
          todo: todoList,
          inProgress: inProgressList,
          done: doneList,
        });
      });
  }, [tasks]);

  const calculateRemainingTime = (
    startDate: string,
    startTime: string,
    endDate: string,
    endTime: string
  ) => {
    const startDateTime = new Date(`${startDate}T${startTime}`);
    const endDateTime = new Date(`${endDate?.split("T")[0]}T${endTime}`);
    const currentTime = new Date();

    if (currentTime > endDateTime) {
      return "0d 0hr 0min";
    }

    let diffInMilliseconds = endDateTime.getTime() - currentTime.getTime();

    const days = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));
    diffInMilliseconds -= days * (1000 * 60 * 60 * 24);

    const hours = Math.floor(diffInMilliseconds / (1000 * 60 * 60));
    diffInMilliseconds -= hours * (1000 * 60 * 60);

    const minutes = Math.floor(diffInMilliseconds / (1000 * 60));

    return `${days}d ${hours}hr ${minutes}min`;
  };

  useEffect(() => {
    if (selectedTask) {
      setIsEditModalOpen(true);
    }
  }, [selectedTask]);

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
    setSelectedTask(null);
  };

  const handleEditClick = (task: Task, column: any, index: number) => {
    // console.log(task);

    setSelectedTask(task);
    setSelectedColumn(column);
    setSelectedIndex(index);
  };

  const handleEditTask = async (updatedTask: Task) => {
    if (selectedColumn !== null && selectedIndex !== null && selectedTask) {
      const res = await fetch(TASK_API.UPDATE(selectedTask._id), {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
          Authorization: `${cookieToken}`,
        },
        body: JSON.stringify(updatedTask),
      });
      const data = await res.json();
      // console.log(data);

      handleCloseModal();
    }
  };

  const renderTasks = (taskList: Task[], column: any) =>
    taskList.map((task: any, index: any) => (
      <tr key={index} className="shadow-md">
        <td className="ps-2 py-4">{task.title}</td>
        <td className=" py-4">{task.description}</td>
        <td className=" py-4">
          {calculateRemainingTime(
            task.startDate,
            task.startTime,
            task.endDate,
            task.endTime
          )}
        </td>
        <td className="flex items-center justify-end pe-2 py-4 gap-2">
          <button
            onClick={() => handleEditClick(task, column, index)}
            className="p-2 bg-black rounded-md"
          >
            <FaRegEdit className="text-white" />
          </button>
          <button
            onClick={() => onDelete(task._id)}
            className="p-2 bg-red-500 rounded-md"
          >
            <MdDelete className="text-white" />
          </button>
        </td>
      </tr>
    ));

  return (
    <div className="grid gap-4">
      <div>
        <h2 className="text-lg font-semibold mb-2 bg-blue-400 text-white px-2 py-1 w-fit rounded-md">
          Todo
        </h2>
        <table className="table-auto w-full">
          <tbody>{renderTasks(customTasks.todo, "todo")}</tbody>
        </table>
      </div>
      <div>
        <h2 className="text-lg font-semibold mb-2 bg-pink-500 text-white px-2 py-1 w-fit rounded-md">
          In Progress
        </h2>
        <table className="table-auto w-full">
          <tbody>{renderTasks(customTasks.inProgress, "in progress")}</tbody>
        </table>
      </div>
      <div>
        <h2 className="text-lg font-semibold mb-2 bg-green-500 text-white px-2 py-1 w-fit rounded-md">
          Done
        </h2>
        <table className="table-auto w-full">
          <tbody>{renderTasks(customTasks.done, "done")}</tbody>
        </table>
      </div>
      <TaskModal
        isOpen={isEditModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleEditTask}
        task={selectedTask}
      />
    </div>
  );
};

export default ListView;
