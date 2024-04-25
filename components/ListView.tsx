import React, { useEffect, useState } from 'react';
import { FaRegEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { initialTasks } from '../app/dashboard/myTasks/page';
import TaskModal from './TaskModal';

type Task = {
  title: string;
  description: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  score?: number;
  status?: 'todo' | 'inProgress' | 'done';
};

type ListViewProps = {
  tasks: {
    todo: Task[];
    inProgress: Task[];
    done: Task[];
  };
  setTasks: React.Dispatch<React.SetStateAction<typeof initialTasks>>;
  onDelete: (column: keyof typeof initialTasks, index: number) => void;
  onEdit: (updatedTask: Task, column: keyof typeof initialTasks, index: number) => void;
};

const ListView: React.FC<ListViewProps> = ({ tasks, onDelete, onEdit, setTasks }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [selectedColumn, setSelectedColumn] = useState<keyof typeof initialTasks | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const calculateRemainingTime = (
    startDate: string,
    startTime: string,
    endDate: string,
    endTime: string
  ) => {
    const startDateTime = new Date(`${startDate}T${startTime}:00`);
    const endDateTime = new Date(`${endDate}T${endTime}:00`);
    const currentTime = new Date();

    if (currentTime > endDateTime) {
      return '0d 0hr 0min';
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

  const handleEditClick = (
    task: Task,
    column: keyof typeof initialTasks,
    index: number
  ) => {
    setSelectedTask(task);
    setSelectedColumn(column);
    setSelectedIndex(index);
  };

  const handleEditTask = (updatedTask: Task) => {
    if (selectedColumn !== null && selectedIndex !== null) {
      const updatedTasks = { ...tasks };
      
      updatedTasks[selectedColumn] = tasks[selectedColumn].filter(
        (_, idx) => idx !== selectedIndex
      );
  
      const newStatus = updatedTask.status || selectedColumn;
  
      if (newStatus !== selectedColumn) {
        if (updatedTasks[newStatus]) {
          updatedTasks[newStatus].push(updatedTask);
        }
      } else {
        if (updatedTasks[newStatus]) {
          updatedTasks[newStatus].push(updatedTask);
        }
      }
  
      setTasks(updatedTasks);
      handleCloseModal();
    }
  };  

  const renderTasks = (taskList: Task[], column: keyof typeof initialTasks) =>
    taskList.map((task, index) => (
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
            onClick={() => onDelete(column as keyof typeof tasks, index)}
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
          <tbody>{renderTasks(tasks.todo, 'todo')}</tbody>
        </table>
      </div>
      <div>
        <h2 className="text-lg font-semibold mb-2 bg-pink-500 text-white px-2 py-1 w-fit rounded-md">
          In Progress
        </h2>
        <table className="table-auto w-full">
          <tbody>{renderTasks(tasks.inProgress, 'inProgress')}</tbody>
        </table>
      </div>
      <div>
        <h2 className="text-lg font-semibold mb-2 bg-green-500 text-white px-2 py-1 w-fit rounded-md">
          Done
        </h2>
        <table className="table-auto w-full">
          <tbody>{renderTasks(tasks.done, 'done')}</tbody>
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
