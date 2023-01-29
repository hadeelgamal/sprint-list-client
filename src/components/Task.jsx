import { useState } from "react";
import axios from "axios";

function Task({ tasks }) {
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [checked, setChecked] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Grab the state variable values
    // Add a new project
    const newTask = { description, dueDate, checked };
    // Add that project to the DB ==> send a POST request to 'http://localhost:5005/api/projects'
    axios
      .post(`${process.env.REACT_APP_API_URL}/api/tasks`, newTask)
      .then((response) => {
        // Reset the state
        setDescription("");
        setDueDate("");
        setChecked(false);
      })
      .catch((error) => console.log(error));
  };

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
           
              <div className="flex mb-4 items-center">
                <p className="w-full text-grey-darkest">task description</p>
                <button className="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-green-500 border-green-500 hover:bg-green">
                  Done
                </button>
                <button className="flex-no-shrink p-2 ml-2 border-2 rounded text-red border-red hover:text-white hover:bg-red">
                  Remove
                </button>
              </div>
          
          </div>
        </div>
      </div>
      {/* <form onSubmit={handleSubmit}>
        <input type="checkbox" name="checked" id="checked" />
        <input
          placeholder="Description"
          type="text"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
 
        <label>Due:</label>
        <input type="date" name="dueDate" id="dueDate" value={dueDate}
          onChange={(e) => setDueDate(e.target.value)} />
       
       
        <button type="submit">Save task</button>
      </form> */}
    </div>
  );
}

export default Task;
