import { useEffect, useRef } from 'react';
import Gantt from 'frappe-gantt';
import 'frappe-gantt/dist/frappe-gantt.css';

const GanttChart: React.FC<{ tasks: any[] }> = ({ tasks }) => {
  const ganttRef = useRef(null);

  useEffect(() => {
    if (ganttRef.current) {
      const gantt = new Gantt(ganttRef.current, tasks, {
        view_mode: 'Day',
        date_format: 'YYYY-MM-DD',
      });
    }
  }, [tasks]);

  return <div ref={ganttRef}></div>;
};

export default GanttChart;
 