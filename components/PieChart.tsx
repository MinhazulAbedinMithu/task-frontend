import "chart.js/auto";
import { Pie } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Chart } from "chart.js";

Chart.register(ChartDataLabels);

interface Task {
  title: string;
  status: string;
}

interface InitialTasks {
  todo: Task[];
  inProgress: Task[];
  done: Task[];
}

interface Props {
  tasks: InitialTasks;
}

const PieChart: React.FC<Props> = ({ tasks }: any) => {
  const completedTasksCount = {
    todo: tasks.filter((task: any) => task.status === "todo").length,
    inProgress: tasks.filter((task: any) => task.status === "in progress")
      .length,
    done: tasks.filter((task: any) => task.status === "done").length,
  };

  const totalTasks =
    completedTasksCount.todo +
    completedTasksCount.inProgress +
    completedTasksCount.done;

  const percentageLabels = [
    `Todo: ${(completedTasksCount.todo / totalTasks) * 100}%`,
    `In Progress: ${(completedTasksCount.inProgress / totalTasks) * 100}%`,
    `Done: ${(completedTasksCount.done / totalTasks) * 100}%`,
  ];

  const data = {
    labels: percentageLabels,
    datasets: [
      {
        data: [
          completedTasksCount.todo,
          completedTasksCount.inProgress,
          completedTasksCount.done,
        ],
        backgroundColor: [
          "rgb(96,165,250)",
          "rgb(236,72,153)",
          "rgb(34,197,94)",
        ],
      },
    ],
  };

  const options = {
    plugins: {
      datalabels: {
        color: "#fff",
        font: {
          weight: "bold" as "bold" | "normal" | "bolder" | "lighter" | number,
          size: 20,
        },
        formatter: (value: number, ctx: any) => {
          const percentage = (value / totalTasks) * 100;
          return `${percentage}%`;
        },
      },
    },
  };

  return (
    <div className="my-4">
      <h2 className="text-2xl font-bold mb-4">Tasks Completion Status</h2>
      <Pie data={data} options={options} />
    </div>
  );
};

export default PieChart;
