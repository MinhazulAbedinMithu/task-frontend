import { useEffect, useRef } from "react";
import Gantt from "frappe-gantt";
import "frappe-gantt/dist/frappe-gantt.css";

type Props = {};

export const initialTasks = {
  todo: [
    {
      title: "Task 1",
      description: "Description 1",
      startDate: "2024-04-23",
      startTime: "09:00",
      endDate: "2024-04-26",
      endTime: "10:00",
      level: "easy",
      status: "todo",
    },
    {
      title: "Task 2",
      description: "Description 2",
      startDate: "2024-04-23",
      startTime: "10:00",
      endDate: "2024-04-26",
      endTime: "11:00",
      level: "hard",
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
      level: "medium",
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
      level: "easy",
      status: "done",
    },
  ],
};

const taskss = [
  ...initialTasks.todo.map((task: any, index: any) => ({
    id: `Task-${index + 1}`,
    name: task.title,
    start: task.startDate,
    end: task.endDate,
  })),
  ...initialTasks.inProgress.map((task: any, index: any) => ({
    id: `Task-${initialTasks.todo.length + index + 1}`,
    name: task.title,
    start: task.startDate,
    end: task.endDate,
  })),
  ...initialTasks.done.map((task: any, index: any) => ({
    id: `Task-${
      initialTasks.todo.length + initialTasks.inProgress.length + index + 1
    }`,
    name: task.title,
    start: task.startDate,
    end: task.endDate,
  })),
];
const GanttChart: React.FC<{ tasks: any[] }> = ({ tasks }) => {
  const ganttRef = useRef(null);

  useEffect(() => {
    if (ganttRef?.current) {
      //@ts-ignore
      const gantt = new Gantt(ganttRef?.current, taskss, {
        view_mode: "Day",
        date_format: "YYYY-MM-DD",
      });
    }

    //@ts-ignore
  }, [taskss]);

  return <div ref={ganttRef}></div>;
};

export default GanttChart;
