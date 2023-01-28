import { useState } from "react";
import axios from "axios";
 
 
function AddProject(props) {
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [checked, setChecked] = useState(false);
 
  const handleSubmit = (e) => {
    e.preventDefault();
    // Grab the state variable values
    // Add a new project
    const newTask = { description, dueDate, checked }
    // Add that project to the DB ==> send a POST request to 'http://localhost:5005/api/projects'
    axios.post(`${process.env.REACT_APP_API_URL}/api/tasks`, newTask)
    .then((response) => {
        // Reset the state
        setDescription("");
        setDueDate("");
        setChecked(false)

      })
      .catch((error) => console.log(error));
  }
 
  return (
    <div className="task">
 
      <form onSubmit={handleSubmit}>
        <input type="checkbox" name="checked" id="checked" />
        <input
          placeholder="Description"
          type="text"
          name="title"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
 
        <label>Due:</label>
        <input type="date" name="dueDate" id="dueDate" value={dueDate}
          onChange={(e) => setDueDate(e.target.value)} />
       
       
        <button type="submit">Save task</button>
      </form>
    </div>
  );
}
 
export default AddProject;