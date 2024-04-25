import React from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { FaPlus } from 'react-icons/fa';
import { initialTasks } from '../app/dashboard/myTasks/page';

interface BoardViewProps {
  tasks: {
    todo: Task[];
    inProgress: Task[];
    done: Task[];
  };
  onDelete: (column: keyof typeof initialTasks, index: number) => void;
  setTasks: React.Dispatch<React.SetStateAction<typeof initialTasks>>;
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

const BoardView: React.FC<BoardViewProps> = ({ tasks, onDelete, setTasks }) => {
  
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

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
  
    const { source, destination } = result;
    const task = tasks[source.droppableId as keyof typeof tasks][source.index];
    const fromColumn = source.droppableId as keyof typeof tasks;
    const toColumn = destination.droppableId as keyof typeof tasks;
  
    if (fromColumn === toColumn) return;
  
    setTasks(prevTasks => ({
      ...prevTasks,
      [fromColumn]: prevTasks[fromColumn].filter((_, index) => index !== source.index),
      [toColumn]: [...prevTasks[toColumn].slice(0, destination.index), task, ...prevTasks[toColumn].slice(destination.index)],
    }));
  };
  

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-3 gap-4">
        {Object.keys(tasks).map((column) => (
          <Droppable key={column} droppableId={column}>
            {(provided: any) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="bg-gray-200 p-4 rounded"
              >
                <h2 className="text-lg font-semibold mb-2">{column}</h2>
                <ul>
                  {tasks[column as keyof typeof tasks].map((task, index) => (
                    <Draggable key={task.title} draggableId={task.title} index={index}>
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
                            <p>Remaining Time: {calculateRemainingTime(task.startDate, task.startTime, task.endDate, task.endTime)}</p>
                          </div>
                          <div className="space-x-2">
                            {column === 'todo' && (
                              <>
                                <button
                                  onClick={() => handleDragEnd({ source: { droppableId: column, index }, destination: { droppableId: 'done', index: tasks.done.length } })}
                                  className="text-green-500"
                                >
                                  &#8594;
                                </button>
                                <button
                                  onClick={() => handleDragEnd({ source: { droppableId: column, index }, destination: { droppableId: 'inProgress', index: tasks.inProgress.length } })}
                                  className="text-blue-500"
                                >
                                  &#8594;
                                </button>
                              </>
                            )}
                            {column === 'inProgress' && (
                              <>
                                <button
                                  onClick={() => handleDragEnd({ source: { droppableId: column, index }, destination: { droppableId: 'done', index: tasks.done.length } })}
                                  className="text-green-500"
                                >
                                  &#8594;
                                </button>
                              </>
                            )}
                            <button onClick={() => onDelete(column as keyof typeof tasks, index)}
                              className="text-red-500"
                            >
                              &#10006;
                            </button>
                          </div>
                        </li>
                      )}
                    </Draggable>
                  ))}
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
