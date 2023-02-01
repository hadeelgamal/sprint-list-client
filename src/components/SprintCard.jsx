import TaskListComponent from "../components/TaskListComponent";
import { Link } from "react-router-dom";


function SprintCard({   _id, title, dueDate, currentStatus, tasks, getAllSprints })  {
 
  return (
    <div className="w-full bg-teal-lightest font-sans">
      <div className=" rounded shadow p-6 m-2">
        <div className="inline-flex">
          {/* adjust title */}
          <h3 className="text-xl bg-white rounded shadow p-2 m-2 w-full">{title}</h3>
          {/* formate date */}
          <h4 className="bg-white rounded shadow p-2 m-2 w-full">{dueDate}</h4>
          <h4 className="bg-white rounded shadow p-2 m-2 w-full">{currentStatus}</h4>
          {/* replace edit button with edit icon  */}
          <Link to={`/sprint/${_id}/edit`}>
            <button className="bg-white rounded shadow p-2 m-2 w-full">
              Edit
            </button>
          </Link>
        </div>
        <TaskListComponent
          taskList={tasks}
          sprintId={_id}
          getAllSprints={getAllSprints}
        />
      </div>
    </div>
  )
}

export default SprintCard