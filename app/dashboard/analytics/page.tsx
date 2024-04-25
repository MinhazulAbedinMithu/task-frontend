'use client'
import GanttChart from '@/components/GanttChart'

type Props = {}

const tasks =[
      {
        id: 'Task-1',
        name: "Task 1",
        start: "2024-04-23",
        end: "2024-04-26",
      },
      {
        id: 'Task-2',
        name: "Task 2",
        start: "2024-04-23",
        end: "2024-04-26",
      },
      {
        id: 'Task-3',
        name: "Task 3",
        start: "2024-04-23",
        end: "2024-04-26",
      },
      {
        id: 'Task-4',
        name: "Task 4",
        start: "2024-04-23",
        end: "2024-04-26",
      },
    ];

const page = (props: Props) => {
  return (
    <div>
        <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Overview</h1>
      <div className="bg-white rounded-lg shadow-lg p-4">
        <GanttChart tasks={tasks} />
      </div>
    </div>
    </div>
  )
}

export default page