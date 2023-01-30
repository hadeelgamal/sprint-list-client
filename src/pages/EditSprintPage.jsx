import { useState, useEffect  } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

import TaskListComponent from "../components/TaskListComponent";


function EditSprintPage(props) {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [currentStatus, setCurrentStatus] = useState("");
  const [tasks, setTasks] = useState([]);

  const { sprintId } = useParams(); 
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const updatedSprint = { title, dueDate, currentStatus };
   
    axios
      .put(`${process.env.REACT_APP_API_URL}/api/sprints/${sprintId}`, updatedSprint)
      .then(() => navigate("/dashboard"))
      .catch(err => console.log(err))
  };

  const deleteSprint = () => {              
    axios
      .delete(`${process.env.REACT_APP_API_URL}/api/sprints/${sprintId}`)
      .then(() => {
        navigate("/dashboard");
      })
      .catch((err) => console.log(err));
  };  

  useEffect(() => {                                
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/sprints/${sprintId}`)
      .then((response) => {
        const oneSprint = response.data;
        setTitle(oneSprint.title);
        setDueDate(oneSprint.dueDate);
        setCurrentStatus(oneSprint.currentStatus)
        setTasks(oneSprint.tasks)
      })
      .catch((error) => console.log(error));
    
  }, [sprintId]);
  console.log("tasks from edit sprint: ", tasks)
  return (
    <div className="AddSprint">
      <div className="bg-grey-lighter min-h-screen flex flex-col">
        <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
            <h1 className="mb-8 text-3xl text-center">Edit Sprint</h1>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="title"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <input
                type="date"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="dueDate"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
              <select
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="currentStatus"
                id="currentStatus"
                value={currentStatus}
                onChange={(e) => setCurrentStatus(e.target.value)}
              >
                <option value="" disabled selected hidden>
                  Choose a status
                </option>
                <option value="ongoing">ongoing</option>
                <option value="upcoming">upcoming</option>
                <option value="past">past</option>
              </select>
              <button
                type="submit"
                className="w-full text-center py-3 rounded bg-green-500 text-white hover:bg-green-dark focus:outline-none my-1"
              >
                save sprint
              </button>
              <button
                type="submit"
                onClick={deleteSprint}
                className="w-full text-center py-3 rounded bg-red-500 text-white hover:bg-green-dark focus:outline-none my-1"
              >
                Delete sprint
              </button>
            </form>
          </div>
        </div>
      </div>
      { tasks && <TaskListComponent taskList={tasks} sprintId={sprintId}/>}
      

    
    </div>
  );
}

export default EditSprintPage;