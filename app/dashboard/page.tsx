"use client";
import { TASK_API } from "@/apiConfig";
import Deadlines from "@/components/Deadlines";
import Scores from "@/components/Scores";
import TaskStatus from "@/components/TaskStatus";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

type Props = {};

const Page = (props: Props) => {
  const [tasks, setTasks] = useState<any>([]);
  const [score, setScore] = useState<any>(null);
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
      let sc = 0;
      apiTasks.forEach((el: any) => {
        if (el.status === "done") {
          if (el.level === "easy") {
            sc += 1;
          } else if (el.level === "medium") {
            sc += 2;
          } else {
            sc += 3;
          }
        }
      });
      setScore(sc);
      const inPTasks = apiTasks.filter((t: any) => t.status === "in progress");
      SetInProgressTask(inPTasks);

      setTasks(apiTasks);
    };
    fetchTasks();
    //@ts-ignore
  }, []);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      <div>
        <Deadlines tasks={inProgressTask} />
      </div>
      <div className="grid grid-cols-1 gap-4">
        <div>
          <Scores score={score} />
        </div>
        <div>
          <TaskStatus tasks={tasks} />
        </div>
      </div>
    </div>
  );
};

export default Page;
