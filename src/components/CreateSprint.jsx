import { useState } from "react";
import axios from "axios";
// import TaskListComponent from "../components/TaskListComponent";
// const API_URL = "http://localhost:5005";
 
function CreateSprint(props) {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [currentStatus, setCurrentStatus] = useState("");
 
  const handleSubmit = (e) => {
    e.preventDefault();
    // Grab the state variable values
    // Add a new project
    const newSprint = { title, dueDate, currentStatus }
    // Add that project to the DB ==> send a POST request to 'http://localhost:5005/api/projects'
    axios.post(`${process.env.REACT_APP_API_URL}/api/sprints`, newSprint)
    .then((response) => {
        // Reset the state
        setTitle("");
        setDueDate("");
        setCurrentStatus("")
        props.getAllSprints();

      })
      .catch((error) => console.log(error));
  }
 
  return (
    <div className="AddSprint">
      <h3>Create Sprint</h3>
 
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
 
        <label>Due:</label>
        <input type="date" name="dueDate" id="dueDate" value={dueDate}
          onChange={(e) => setDueDate(e.target.value)} />
       
       <label>Status:</label>
       <select name="currentStatus" id="currentStatus"  onChange={(e) => setCurrentStatus(e.target.value)}>
       <option value="" disabled selected hidden>Choose a status</option>
        <option value="ongoing">ongoing</option>
        <option value="upcoming">upcoming</option>
        <option value="past">past</option>
        </select> 
        <button type="submit">Save Sprint</button>
      </form>
    </div>
  );
}
 
export default CreateSprint;