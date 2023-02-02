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
    <div className="bg-grey-lighter m-4">
      <div className="mx-auto w-2/3 bg-white px-6 py-8 rounded shadow-md text-black  ">
        <h1 className="mb-8 text-3xl text-center">Create Sprint</h1>
        <form className="lg:inline-flex  md:space-x-10 " onSubmit={handleSubmit}>
          <input
            type="text"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="title"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <input
            type="date"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="dueDate"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
          <select
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="currentStatus"
            id="currentStatus"
            onChange={(e) => setCurrentStatus(e.target.value)}
            required
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
            className="w-full mb-5 text-center py-3 rounded bg-green-500 text-white hover:bg-green-dark focus:outline-none my-1"
          >
            create sprint
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateSprint;
