import { useState } from "react";
import axios from "axios";
// import TaskListComponent from "../components/TaskListComponent";
// const API_URL = "http://localhost:5005";

function CreateSprint(props) {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [currentStatus, setCurrentStatus] = useState("");

  const handleSubmit = (e) => {
    const storedToken = localStorage.getItem("authToken");

    e.preventDefault();
    // Grab the state variable values
    // Add a new project
    const newSprint = { title, dueDate, currentStatus };
    // Add that project to the DB ==> send a POST request to 'http://localhost:5005/api/projects'
    axios
      .post(`${process.env.REACT_APP_API_URL}/api/sprints`, newSprint, { headers: { Authorization: `Bearer ${storedToken}` } })
      .then((response) => {
        // Reset the state
        setTitle("");
        setDueDate("");
        setCurrentStatus("");
        props.getAllSprints();
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="AddSprint">
      <div className="bg-grey-lighter min-h-screen flex flex-col">
        <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
            <h1 className="mb-8 text-3xl text-center">Create Sprint</h1>
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
                create sprint
              </button>
            </form>
          </div>
        </div>
      </div>

    
    </div>
  );
}

export default CreateSprint;
