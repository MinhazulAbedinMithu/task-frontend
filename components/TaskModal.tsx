import React, { useEffect, useState } from "react";

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

type TaskModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (task: Task) => void;
  task?: Task | null;
};

const TaskModal: React.FC<TaskModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  task,
}) => {
  const defaultTask: Task = {
    title: "",
    description: "",
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    level: "easy",
    status: "todo",
  };

  const [formData, setFormData] = useState<any>(task || defaultTask);

  useEffect(() => {
    if (task) {
      setFormData(task);
    } else {
      setFormData(defaultTask);
    }

    //@ts-ignore
  }, [task]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData) {
      console.log(formData);

      onSubmit(formData);
      onClose();
    }
  };

  // console.log(formData);

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg w-96 p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">
                {task ? "Edit Task" : "Create New Task"}
              </h2>
              <button onClick={onClose} className="text-red-500">
                &#10006;
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  defaultValue={formData.title}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  name="description"
                  defaultValue={formData.description}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>
              <div className="flex mb-4">
                <div className="w-1/2 mr-2">
                  <label
                    htmlFor="startDate"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Start Date
                  </label>
                  <input
                    type="date"
                    id="startDate"
                    name="startDate"
                    defaultValue={formData.startDate?.split("T")[0]}
                    onChange={handleChange}
                    className="mt-1 p-2 w-full border rounded-md"
                    required
                  />
                </div>
                <div className="w-1/2 ml-2">
                  <label
                    htmlFor="startTime"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Start Time
                  </label>
                  <input
                    type="time"
                    id="startTime"
                    name="startTime"
                    defaultValue={formData.startTime}
                    onChange={handleChange}
                    className="mt-1 p-2 w-full border rounded-md"
                    required
                  />
                </div>
              </div>
              <div className="flex mb-4">
                <div className="w-1/2 mr-2">
                  <label
                    htmlFor="endDate"
                    className="block text-sm font-medium text-gray-700"
                  >
                    End Date
                  </label>
                  <input
                    type="date"
                    id="endDate"
                    name="endDate"
                    defaultValue={formData.endDate?.split("T")[0]}
                    onChange={handleChange}
                    className="mt-1 p-2 w-full border rounded-md"
                    required
                  />
                </div>
                <div className="w-1/2 ml-2">
                  <label
                    htmlFor="endTime"
                    className="block text-sm font-medium text-gray-700"
                  >
                    End Time
                  </label>
                  <input
                    type="time"
                    id="endTime"
                    name="endTime"
                    defaultValue={formData.endTime}
                    onChange={handleChange}
                    className="mt-1 p-2 w-full border rounded-md"
                    required
                  />
                </div>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="level"
                  className="block text-sm font-medium text-gray-700"
                >
                  Level
                </label>
                <select
                  id="level"
                  name="level"
                  defaultValue={formData.level}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded-md"
                >
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="status"
                  className="block text-sm font-medium text-gray-700"
                >
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  defaultValue={formData.status}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded-md"
                >
                  <option value="todo">To Do</option>
                  <option value="in progress">In Progress</option>
                  <option value="done">Done</option>
                </select>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-500 text-white p-2 rounded-md mr-2"
                >
                  {task ? "Save Changes" : "Create Task"}
                </button>
                <button
                  onClick={onClose}
                  className="bg-gray-300 text-black p-2 rounded-md"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default TaskModal;
