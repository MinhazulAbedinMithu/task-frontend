import Deadlines from "@/components/Deadlines";
import Scores from "@/components/Scores";
import TaskStatus from "@/components/TaskStatus";
import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      <div>
        <Deadlines />
      </div>
      <div className="grid grid-cols-1 gap-4">
        <div>
          <Scores />
        </div>
        <div>
          <TaskStatus />
        </div>
      </div>
    </div>
  );
};

export default page;
