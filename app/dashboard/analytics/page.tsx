"use client";
import GanttChart from "@/components/GanttChart";
import PieChart from "@/components/PieChart";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { TASK_API } from "@/apiConfig";
// import { initialTasks } from '../myTasks/page';

type Props = {};

// const tasks = [
//   ...initialTasks.todo.map((task, index) => ({
//     id: `Task-${index + 1}`,
//     name: task.title,
//     start: task.startDate,
//     end: task.endDate,
//   })),
//   ...initialTasks.inProgress.map((task, index) => ({
//     id: `Task-${initialTasks.todo.length + index + 1}`,
//     name: task.title,
//     start: task.startDate,
//     end: task.endDate,
//   })),
//   ...initialTasks.done.map((task, index) => ({
//     id: `Task-${initialTasks.todo.length + initialTasks.inProgress.length + index + 1}`,
//     name: task.title,
//     start: task.startDate,
//     end: task.endDate,
//   })),
// ];

const Page = () => {
  const [tasks, setTasks] = useState<any>([]);
  const [inProgressTask, SetInProgressTask] = useState([]);
  const cookieToken = Cookies.get("token") || "{}";
  useEffect(() => {
    const fetchTasks = async () => {
      const res = await fetch(`${TASK_API.ALL}`, {
        headers: {
          Authorization: `${cookieToken}`,
        },
      });
      const apiTasks = await res.json();
      // console.log(apiTasks);
      const inPTasks = apiTasks.filter((t: any) => t.status === "in progress");
      SetInProgressTask(inPTasks);

      setTasks(apiTasks);
    };
    fetchTasks();
  }, []);
  return (
    <div>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Overview</h1>
        <div className="bg-white rounded-lg shadow-lg p-4">
          <GanttChart tasks={tasks} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <PieChart tasks={tasks} />
        </div>
      </div>
    </div>
  );
};

export default Page;
