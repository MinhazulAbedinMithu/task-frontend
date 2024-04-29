import { TASK_API } from "@/apiConfig";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import { FaPlus } from "react-icons/fa";
// import { initialTasks } from "../app/dashboard/myTasks/page";

interface BoardViewProps {
  tasks: {
    todo: Task[];
    inProgress: Task[];
    done: Task[];
  };
  onDelete: (column: any, index: number) => void;
  setTasks: React.Dispatch<React.SetStateAction<any>>;
}

interface Task {
  title: string;
  description: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  score?: number;
  status?: "todo" | "inProgress" | "done";
}

const BoardView: React.FC<any> = ({ tasks, onDelete, setTasks }) => {
  const [customTasks, setCustomTasks] = useState<any>({
    todo: [],
    inProgress: [],
    done: [],
  });
  const [dragged, setDragged] = useState(false);
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
      setTasks(apiTasks);
    };
    fetchTasks();
    //@ts-ignore
  }, [dragged]);

  // console.log(customTasks);

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
    const startDateTime = new Date(`${startDate}T${startTime}:00`);
    const endDateTime = new Date(`${endDate.split("T")[0]}T${endTime}:00`);
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

  const handleDragEnd = async (result: any) => {
    if (!result.destination) return;

    const { source, destination } = result;
    const task =
      customTasks[source.droppableId as keyof typeof customTasks][source.index];
    const fromColumn = source.droppableId as keyof typeof customTasks;
    const toColumn = destination.droppableId as keyof typeof customTasks;

    if (fromColumn === toColumn) return;

    console.log(task, result);
    const dest =
      destination.droppableId === "inProgress"
        ? "in progress"
        : destination.droppableId;
    const res = await fetch(TASK_API.UPDATE(task._id), {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        Authorization: `${cookieToken}`,
      },
      body: JSON.stringify({ ...task, status: dest }),
    });
    const data = await res.json();
    // console.log(data);

    setCustomTasks((prevTasks: any) => ({
      ...prevTasks,
      [fromColumn]: prevTasks[fromColumn]?.filter(
        //@ts-ignore
        (_, index): any => index !== source.index
      ),
      [toColumn]: [
        ...prevTasks[toColumn]?.slice(0, destination.index),
        task,
        ...prevTasks[toColumn]?.slice(destination.index),
      ],
    }));
    setDragged(!dragged);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-3 gap-4">
        {Object.keys(customTasks).map((column) => (
          <Droppable key={column} droppableId={column}>
            {(provided: any) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="bg-gray-200 p-4 rounded"
              >
                <h2 className="text-lg font-semibold mb-2">{column}</h2>
                <ul>
                  {Array.isArray(customTasks[column]) &&
                    //@ts-ignore
                    customTasks[column].map(
                      //@ts-ignore
                      (task, index): any => (
                        <Draggable
                          key={task.title}
                          draggableId={task.title}
                          index={index}
                        >
                          {/* {console.log(task)} */}
                          {(provided: any) => (
                            <li
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="flex justify-between items-center border-b py-2 bg-white p-2 rounded-md mb-2 shadow-md"
                            >
                              <div>
                                <h3>{task.title}</h3>
                                <p>{task.description}</p>
                                <p>
                                  Remaining Time:{" "}
                                  {calculateRemainingTime(
                                    task.startDate,
                                    task.startTime,
                                    task.endDate,
                                    task.endTime
                                  )}
                                </p>
                              </div>
                              <div className="space-x-2">
                                {column === "todo" && (
                                  <>
                                    <button
                                      onClick={() =>
                                        handleDragEnd({
                                          source: {
                                            droppableId: column,
                                            index,
                                          },
                                          destination: {
                                            droppableId: "done",
                                            index: customTasks.done.length,
                                          },
                                        })
                                      }
                                      className="text-green-500"
                                    >
                                      &#8594;
                                    </button>
                                    <button
                                      onClick={() =>
                                        handleDragEnd({
                                          source: {
                                            droppableId: column,
                                            index,
                                          },
                                          destination: {
                                            droppableId: "inProgress",
                                            index:
                                              customTasks.inProgress.length,
                                          },
                                        })
                                      }
                                      className="text-blue-500"
                                    >
                                      &#8594;
                                    </button>
                                  </>
                                )}
                                {column === "inProgress" && (
                                  <>
                                    <button
                                      onClick={() =>
                                        handleDragEnd({
                                          source: {
                                            droppableId: column,
                                            index,
                                          },
                                          destination: {
                                            droppableId: "done",
                                            index: customTasks.done.length,
                                          },
                                        })
                                      }
                                      className="text-green-500"
                                    >
                                      &#8594;
                                    </button>
                                  </>
                                )}
                                <button
                                  onClick={() =>
                                    onDelete(
                                      column as keyof typeof tasks,
                                      index
                                    )
                                  }
                                  className="text-red-500"
                                >
                                  &#10006;
                                </button>
                              </div>
                            </li>
                          )}
                        </Draggable>
                      )
                    )}
                </ul>
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};

export default BoardView;
