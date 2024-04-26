"use client";
import { initialTasks } from "@/app/dashboard/myTasks/page";

type Props = {};

const TaskStatus = (props: Props) => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Task Status</h1>
      <table className="table-auto w-full">
        <thead className="bg-blue-500 font-bold text-white">
          <tr>
            <td className="p-2">Title</td>
            <td className="p-2">End Date</td>
            <td className="p-2">Status</td>
          </tr>
        </thead>
        <tbody>
          {initialTasks.todo.map((task) => (
            <tr className="shadow-md" key={task.title}>
              <td className="p-2">{task.title}</td>
              <td className="p-2">{task.endDate}</td>
              <td>
                <p
                  className={`${
                    task.status === "todo" && "bg-blue-400 p-1 text-white w-fit text-xs rounded-sm"
                  }`}
                >
                  {task.status}
                </p>
              </td>
            </tr>
          ))}
          {initialTasks.inProgress.map((task) => (
            <tr className="shadow-md" key={task.title}>
              <td className="p-2">{task.title}</td>
              <td className="p-2">{task.endDate}</td>
              <td>
                <p
                  className={`${
                    task.status === "inProgress" &&
                    "bg-pink-500 p-1 text-white w-fit text-xs rounded-sm"
                  }`}
                >
                  {task.status}
                </p>
              </td>
            </tr>
          ))}
          {initialTasks.done.map((task) => (
            <tr className="shadow-md" key={task.title}>
              <td className="p-2">{task.title}</td>
              <td className="p-2">{task.endDate}</td>
              <td>
                <p
                  className={`${
                    task.status === "done" && "bg-green-500 p-1 text-white w-fit text-xs rounded-sm"
                  }`}
                >
                  {task.status}
                </p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskStatus;
