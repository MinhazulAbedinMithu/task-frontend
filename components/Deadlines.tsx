"use client";

type Props = {};

const Deadlines = ({ tasks }: any) => {
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
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Upcoming deadlines</h1>
      <table className="table-auto w-full">
        <thead className="bg-blue-500 font-bold text-white">
          <tr>
            <td className="p-2">Task Title</td>
            <td className="p-2">Deadlines</td>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task: any) => (
            <tr className="shadow-md" key={task.title}>
              <td className="p-2">{task.title}</td>
              <td className="p-2">
                {calculateRemainingTime(
                  task.startDate,
                  task.startTime,
                  task.endDate,
                  task.endTime
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Deadlines;
