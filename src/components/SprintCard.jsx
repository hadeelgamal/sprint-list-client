import TaskListComponent from "../components/TaskListComponent";


function SprintCard({   title, dueDate, currentStatus, tasks })  {
  console.log("tasks from sprintcard: ", tasks);
  return (
    <div className="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
      <div className="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
        <div className="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
        <h3 className='bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg'>{title}</h3>
        <h4 className='bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg'>{dueDate}</h4>
        <h4 className='bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg'>{currentStatus}</h4>
        </div>
        <TaskListComponent tasks={tasks} />
    </div>
    </div>
  )
}

export default SprintCard