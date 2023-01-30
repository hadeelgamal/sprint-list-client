import { useState } from "react";
import axios from "axios";

const TaskListComponent = ({ taskList, sprintId, getAllSprints }) => {
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [checked, setChecked] = useState(false);
  const [tasks, setTasks] = useState(taskList);

  const handleChecked = (e, taskId) =>{
    axios.put(`${process.env.REACT_APP_API_URL}/api/tasks/${taskId}`, {checked: e})
    getAllSprints()
  }

  const handleRemove = (taskId) => {
    axios
      .delete(
        `${process.env.REACT_APP_API_URL}/api/tasks/${sprintId}/${taskId}`
      )
      .then((response) => {
        const updatedTaskList = [
          ...tasks.filter((task) => response.data.includes(task._id)),
        ];
        setTasks(updatedTaskList);
      });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // Grab the state variable values
    // Add a new project
    const newTask = { description, dueDate, checked, sprintId };
    // Add that project to the DB ==> send a POST request to 'http://localhost:5005/api/projects'
    axios
      .post(`${process.env.REACT_APP_API_URL}/api/tasks`, newTask)
      .then((response) => {
        const updatedTaskList = [...tasks, response.data];
        // Reset the state
        setDescription("");
        setDueDate("");
        setChecked(false);
        setTasks(updatedTaskList);
      })
      .catch((error) => console.log(error));
  };
  console.log("props tasks from task", tasks);
  return (
    <div className="task">
      <div className="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
        <div className="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
          <div className="mb-4">
            <h1 className="text-grey-darkest">Todo List</h1>
            <form onSubmit={handleSubmit}>
              <div className="flex mt-4">
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker"
                  placeholder="Add Todo"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <button className="flex-no-shrink p-2 border-2 rounded text-teal border-teal-500 hover:text-white hover:bg-teal">
                  Add
                </button>
              </div>
            </form>
          </div>
          <div>
            {tasks.map((task) => (
              <div key={task._id} className="flex mb-4 items-center">
                <p className="w-full text-grey-darkest">{task.description}</p>
                {/* <button className="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-green-500 border-green-500 hover:bg-green">
                  Done
                </button> */}
                <input
                  className="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-green-500 border-green-500 hover:bg-green"
                  type="checkbox"
                  name="checked"
                  id="checked"
                  onClick={(e) => handleChecked(e.target.checked, task._id)}


                />
                <button
                  onClick={() => handleRemove(task._id)}
                  className="flex-no-shrink p-2 ml-2 border-2 rounded text-red border-red hover:text-white hover:bg-red"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskListComponent;
